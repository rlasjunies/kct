import * as moment from 'moment';
import * as constant from 'app/constant';

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { arrayRemove } from 'misc';
import { TimerValue, enumTimerStatus, TimerChangeNotification } from 'models';

@Injectable()
export class TimerProvider {
    private _timers: string[] = [];

    // Observable navItem source
    // http://stackoverflow.com/questions/34376854/delegation-eventemitter-or-observable-in-angular2
    private _notification = new BehaviorSubject<TimerChangeNotification>(null);

    // Observable navItem stream
    notification$ = this._notification.asObservable();

    constructor() {
        // console.log('TimerService ... loaded!');
    }

    public isThereAtLeastOneTimerRunning = (): boolean => {
        // // return this.cimer.
        // })
        return true;
    }

    private raiseTimerChangeNotification = (guidEvent: string, value: TimerValue) => {
        // console.log('raiseTimerChange:', guidEvent);
        this._notification.next(new TimerChangeNotification(guidEvent, value));
    }

    public startTimer = (guid: string): void => {
        const timerValue: TimerValue = this.getTimerValue(guid);
        console.log('timer-service:', guid);
        // RL 20170506 - remove the control enumTimerStatus.RUNNING
        if (timerValue.status === enumTimerStatus.ACKNOWLEDGE ||
            timerValue.status === enumTimerStatus.OVER_1ST_TIME ||
            timerValue.status === enumTimerStatus.OVER) {
            console.log('Could not start timer status is not good');
        } else {
            console.log('timer-service:before setInterval', guid);

            this._timers[guid] = setInterval(() => {
                // let timerValue: TimerValue;
                // timerValue = this.getTimerValue(guid);
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
                        this.raiseTimerChangeNotification(guid + constant.TIMER_OVER_1ST_TIME_EVENT, timerValue);
                    } else {
                        // OVER Timer => raise event
                        timerValue.status = enumTimerStatus.OVER;
                        this.raiseTimerChangeNotification(guid + constant.TIMER_OVER_EVENT, timerValue);
                    }
                } else {
                    // Emit tick event
                    timerValue.status = enumTimerStatus.RUNNING;
                    this.raiseTimerChangeNotification(guid + constant.TIMER_TICK_EVENT, timerValue);
                }
                // Persist the duration left
                const timerValueStringified = JSON.stringify(timerValue);
                localStorage.setItem(constant.STORAGEKEY_PREFIX + guid, timerValueStringified);
            }, constant.TIMER_DURATION);

            timerValue.status = enumTimerStatus.STARTED;
            this.raiseTimerChangeNotification(guid + constant.TIMER_STARTED_EVENT, timerValue);
        }
    }

    public stopTimer = (guid: string): void => {
        // alert('dans stop timer guid=' + guid);
        const timerValue: TimerValue = this.getTimerValue(guid);
        if (timerValue) {
            // clear the timer
            clearInterval(this._timers[guid]);
            arrayRemove(this._timers, guid);

            // raised the timer status event
            if (timerValue.status === enumTimerStatus.OVER_1ST_TIME ||
                timerValue.status === enumTimerStatus.OVER) {
                timerValue.status = enumTimerStatus.ACKNOWLEDGE;
                // alert('dans stop timer raised ACKNOWLEDGE');
                this.raiseTimerChangeNotification(guid + constant.TIMER_STOPPED_EVENT, timerValue);
            } else if (timerValue.status === enumTimerStatus.RUNNING) {
                timerValue.status = enumTimerStatus.HOLD;
                // alert('dans stop timer raised HOLD');
                this.raiseTimerChangeNotification(guid + constant.TIMER_HELD_EVENT, timerValue);
            }
            localStorage.setItem(constant.STORAGEKEY_PREFIX + guid, JSON.stringify(timerValue));
        } else {
            console.warn('ALGO ERROR: should not be in that case');
        }
    }

    public getTimerValue = (guid: string): TimerValue => {
        return JSON.parse(localStorage.getItem(constant.STORAGEKEY_PREFIX + guid));
    }

    public isTimerActiveAndRunning = (guid: string): boolean => {
        const timerValue = this.getTimerValue(guid);
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


