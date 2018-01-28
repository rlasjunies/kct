import * as moment from 'moment';
import { Injectable, isDevMode } from '@angular/core';

import * as constant from 'app/constant';
import * as models from 'models';
import * as misc from 'misc/misc';
import { TimerProvider } from 'providers/timer-service/timer-service';
import { TimerStorageProvider } from 'providers/timer-storage/timer-storage';
import { EventsBroadcasterProvider } from 'providers/events-broadcaster/events-broadcaster';
// import * as providers from 'providers';

@Injectable()
export class TimerConfigService {
    public eventsTimersconfigChanged = 'timersConfig:changed';
    public eventsTimersconfigDeleted = 'timersConfig:deleted';

    constructor(
        public storage: TimerStorageProvider,
        private events: EventsBroadcasterProvider,
        private timerService: TimerProvider
    ) {
        console.log('TimerConfigService ... loaded!');
    }

    private _config: models.IConfig;

    public reinitializeAll() {
        for (const guid in this._config) {
            this.storage.removeTimerValue(guid);
        }
        this.storage.removeConfig();
        this.getAll();
    }

    public getAll(): models.TimerConfig[] {
        this._config = this.storage.getConfig();

        this.checkIfFirstLoad();

        // timers should be reinitialize every day
        // Shoud we initialize the timers? Is last initialisation date today or before?
        const n = moment(Date.now());
        const d = moment(this._config.dayOfLastTimersCalculation, constant.DATE_STORE_FORMAT);
        const diff = n.diff(d);
        const duration = moment.duration(diff);
        const days = duration.asDays();

        if (days > 1) {
            // More than one day that we evaluate the timers
            this._initializeTimers();
        }

        return this._config.timersConfig;
    }

    private checkIfFirstLoad() {
        const firstLoad = !this._config;
        let firstLoadConfig: models.IConfig;
        if (firstLoad) {
            if (isDevMode()) {

                // 1st time in the application in dev Mode
                firstLoadConfig = {
                    dayOfLastTimersCalculation: '2016-08-10',
                    timersConfig: [
                        {
                            guid: '569dc9e5-8874-46bc-9e92-1c8cfbdaf0a3', weekdays: 96,
                            title: 'Paul-game', durationMilliSecond: 5000, durationHumanized: '01:00',
                            icon: 'game-controller-b', enable: true
                        },
                        {
                            guid: 'a99897da-1460-409b-9778-571a3c4756ae', weekdays: 127,
                            title: 'Paul-TV', durationMilliSecond: 5000, durationHumanized: '01:00', icon: 'film', enable: true
                        },
                        {
                            guid: '17913ab4-b7b2-4aba-af9f-01e6019844b3', weekdays: 96,
                            title: 'Louis-game', durationMilliSecond: 5000, durationHumanized: '01:00', icon: 'game-controller-b',
                            enable: true
                        },
                        {
                            guid: 'ef8d4703-d939-4b75-a814-0157cb8ac0b5', weekdays: 127,
                            title: 'Louis-TV', durationMilliSecond: 5000, durationHumanized: '01:00', icon: 'film', enable: true
                        },
                    ]
                };
            } else {

                // initial config in released version
                firstLoadConfig = {
                    dayOfLastTimersCalculation: '2016-08-10',
                    timersConfig: []
                };
            }
            this._config = firstLoadConfig;
            this._storeConfig();

            // For each timer create an unique timerValue
            for (const timerConf in firstLoadConfig.timersConfig) {
                this._storeTimerValue(firstLoadConfig.timersConfig[timerConf]);
            }

            console.warn('1st initialisation done');
        }
    }
    private _initializeTimers(): void {
        console.log('_initializeTimers ....!');

        for (const timerConfig of this._config.timersConfig) {
            this._initializeTimer(timerConfig);
        }

        // We update the indicator of the last
        this._config.dayOfLastTimersCalculation = moment(Date.now()).format(constant.DATE_STORE_FORMAT);
        this._storeConfig();
    }

    private _initializeTimer(timerConfig: models.TimerConfig) {
        const todayDay: number = moment(Date.now()).isoWeekday() - 1;

        // remove the persisted timer
        this.storage.removeTimerValue(timerConfig.guid);

        // Is it a good day?
        // console.log("today - config days!", todayDay, timerConfig.weekdays);
        // console.log('timer today?:' + (Math.pow(2, todayDay) & timerConfig.weekdays));
        if ((Math.pow(2, todayDay) && timerConfig.weekdays) !== 0) {
            // Timer can run today
            this._storeTimerValue(timerConfig);
        }
    }

    public whenIsNext(guid: string): string {
        // 0 1 monday
        // 1 2 tuesday
        // 2 4 wednesday
        // 3 8 thursday
        // 4 16 friday
        // 5 32 saturday
        // 6 64 sunday

        // 40 = thurs + saturday

        // test#1: made on monday
        // test#2: made on thursday
        // test#3: made on friday
        // test#4: made on sunday

        /** algo
        * 	todayDayNumber => offset
        * 	loop 7 times/days
        * 	isThereTimerForThisDay
        */

        const config: models.TimerConfig = this._config.timersConfig.find((timer) => {
            return (timer.guid === guid);
        });
        const todayDay: number = moment(Date.now()).weekday() + 1;
        // let tomorrow: number = moment(Date.now()).weekday() + 2;
        if ((Math.pow(2, todayDay) && config.weekdays) !== 0) {
            // Timer can run today
            return 'today';
        }
    }

    public get(guid: string): models.TimerConfig {
        this.checkConfigIsLoadedOrLoadIt();
        return this._config.timersConfig.find(timerConfig => {
            return timerConfig.guid === guid;
        });
    }

    public update(timerConf: models.TimerConfig): void {
        console.log('Entering in update', timerConf);
        this.checkConfigIsLoadedOrLoadIt();
        this._stopTimerIfActive(timerConf.guid);

        this._config.timersConfig[timerConf.guid] = timerConf;
        this._storeConfig();
        this._initializeTimer(timerConf);
        this.events.publish(this.eventsTimersconfigChanged, timerConf);
    }

    private _stopTimerIfActive(guid: string) {
        if (this.timerService.isTimerActiveAndRunning(guid)) {
            this.timerService.stopTimer(guid);
        }
    }
    /*
     * initialize a timerConfig object
     * does not store it
     */
    public new_(): models.TimerConfig {
        this.checkConfigIsLoadedOrLoadIt();
        const newConfig = {
            guid: misc.GUID_new(),
            title: '',
            durationMilliSecond: 5400000,
            durationHumanized: '',
            icon: 'laptop',
            weekdays: 96,
            enable: true
        };
        this._config.timersConfig.push(newConfig);

        return newConfig;
    }

    /*
     * delete the item from the timersConfig[]
     * and persist it
     *
     * delete the timerValue persited either
     */
    public delete(guid: string): boolean {
        this.checkConfigIsLoadedOrLoadIt();

        // remove the timerConfig in memory and persist
        // delete this._config.timersConfig[guid];
        const index = this._config.timersConfig.findIndex((timer) => {
            return timer.guid === guid;
        });
        this._config.timersConfig.splice(index, 1);
        this._storeConfig();

        // remove the timerValue persisted key
        this.storage.removeTimerValue(guid);
        this.events.publish(this.eventsTimersconfigDeleted, guid);
        return true;
    }

    /*
     * method to store the instance of the timerConfig array
     */
    private _storeConfig() {
        this.storage.setConfig(this._config);
    }

    /*
     * Convert the timerConf in timerValue and store it
     * usefull for creating a new timerConfig???
     */
    private _storeTimerValue(timerConf: models.TimerConfig) {
        const timerValue: models.TimerValue = {
            guid: timerConf.guid,
            title: timerConf.title,
            durationLeft_MilliSecond: timerConf.durationMilliSecond,
            duration: timerConf.durationMilliSecond,
            status: 10
        };

        this.storage.setTimerValue(timerConf.guid, timerValue);
    }

    private checkConfigIsLoadedOrLoadIt() {
        if (!this._config) { this.getAll(); }
    }
}


