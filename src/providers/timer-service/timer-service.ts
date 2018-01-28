import * as moment from 'moment';
import * as constants from 'app/constant';

import { Injectable } from '@angular/core';
import { arrayRemove } from 'misc';
import {
    TimerValue,
    enumTimerStatus,
    TimerChangeNotification,
    TimerChangeNotification1stTime,
    TimerChangeNotificationOver,
    TimerChangeNotificationOverStarted,
    TimerChangeNotificationAcknowledged,
    TimerChangeNotificationHeld } from 'models';
import { EventsBroadcasterProvider } from '../../providers/events-broadcaster/events-broadcaster';
import { TimerStorageProvider } from '../../providers/timer-storage/timer-storage';

@Injectable()
export class TimerProvider {
    private _timers: string[] = [];

    constructor(
        private events: EventsBroadcasterProvider,
        public timerStorage: TimerStorageProvider
    ) { }

    public isThereAtLeastOneTimerRunning = (): boolean => {
        let thereIsOneTimerRunning = false;
        const config = this.timerStorage.getConfig();

        for (const conf of config.timersConfig) {
            if (this.isTimerActiveAndRunning(conf.guid)) {
                thereIsOneTimerRunning = true;
                break;
            }
        }
        return thereIsOneTimerRunning;
    }

    public startTimer = (guid: string): void => {
        const timerValue: TimerValue = this.timerStorage.getTimerValue(guid);
        console.log('timer-service:', guid);

        if (timerValue.status === enumTimerStatus.ACKNOWLEDGE ||
            timerValue.status === enumTimerStatus.OVER_1ST_TIME ||
            timerValue.status === enumTimerStatus.OVER) {
            console.warn('Could not start timer status is not good');
        } else {
            console.log('timer-service:before setInterval', guid);

            this._timers[guid] = setInterval(() => {
                timerValue.durationLeft_MilliSecond =
                    moment
                        .duration(timerValue.durationLeft_MilliSecond)
                        .subtract(1, 'seconds')
                        .asMilliseconds();

                // overtime?
                if (timerValue.durationLeft_MilliSecond <= 0) {

                    // 1st overtime?
                    if (timerValue.status === enumTimerStatus.RUNNING) {
                        // 1st time the timer is => raise event
                        timerValue.status = enumTimerStatus.OVER_1ST_TIME;
                        this.events.publish( constants.EVENT_TIMER_TICK, new TimerChangeNotification1stTime(guid, timerValue) );
                    } else {
                        // OVER Timer => raise event
                        timerValue.status = enumTimerStatus.OVER;
                        this.events.publish(constants.EVENT_TIMER_TICK, new TimerChangeNotificationOver(guid, timerValue) );
                    }
                } else {
                    // Emit tick event
                    timerValue.status = enumTimerStatus.RUNNING;
                    this.events.publish(constants.EVENT_TIMER_TICK, new TimerChangeNotification(guid, timerValue));
                }
                // Persist the duration left
                this.timerStorage.setTimerValue(guid, timerValue);
            }, constants.TIMER_DURATION);

            timerValue.status = enumTimerStatus.STARTED;
            this.events.publish(constants.EVENT_TIMER_TICK, new TimerChangeNotificationOverStarted(guid, timerValue));
        }
    }

    public stopTimer = (guid: string): void => {
        const timerValue: TimerValue = this.timerStorage.getTimerValue(guid);
        if (timerValue) {
            // clear the timer
            clearInterval(this._timers[guid]);
            arrayRemove(this._timers, guid);

            // raised the timer status event
            if (timerValue.status === enumTimerStatus.OVER_1ST_TIME ||
                timerValue.status === enumTimerStatus.OVER) {
                timerValue.status = enumTimerStatus.ACKNOWLEDGE;

                this.events.publish(constants.EVENT_TIMER_TICK, new TimerChangeNotificationAcknowledged (guid, timerValue) );
            } else if (timerValue.status === enumTimerStatus.RUNNING) {
                timerValue.status = enumTimerStatus.HOLD;

                this.events.publish(constants.EVENT_TIMER_TICK, new TimerChangeNotificationHeld(guid, timerValue) );
            }
            this.timerStorage.setTimerValue(guid, timerValue);
        } else {
            console.warn('ALGO ERROR: should not be in that case');
        }
    }

    public getTimerValue = (guid: string): TimerValue => {
        return this.timerStorage.getTimerValue(guid);
    }

    public isTimerActiveAndRunning = (guid: string): boolean => {
        const timerValue = this.timerStorage.getTimerValue(guid);
        if (timerValue === null) {
            return false;
        } else if ((timerValue.status === enumTimerStatus.RUNNING)
            || (timerValue.status === enumTimerStatus.STARTED)) {
            return true;
        } else {
            return false;
        }
    }
}


