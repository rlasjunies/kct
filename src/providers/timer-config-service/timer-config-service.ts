import * as moment from 'moment';
import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';

import * as constant from 'app/constant';
import * as models from 'models';
import * as misc from 'misc/misc';

import { TimerService } from "providers/timer-service/timer-service";

// export const eventsTimersconfigTitleChanged = "title:change";

@Injectable()
export class TimerConfigService {
	public eventsTimersconfigChanged = "timersConfig:changed";
	public eventsTimersconfigDeleted = "timersConfig:deleted";

	constructor(
		public storage: Storage,
		private events: Events,
		private timerService: TimerService) {
		console.log('TimerConfigService ... loaded!');
	}

	private _config: models.IConfig;

	public reinitializeAll() {
		for (var guid in this._config) {
			this.storage.removeItem(constant.STORAGEKEY_PREFIX + guid);
		}
		this.storage.removeItem(constant.STORAGEKEY_TIMERS);
		this.getAll();
	}

	public getAll(): models.TimerConfig[] {
		this._config = JSON.parse(this.storage.getItem(constant.STORAGEKEY_TIMERS));

		// check first time in the application
		if (!this._config) {
			// 1st time in the application
			// TODO navigate to init wizard

			var config: models.IConfig = {
				dayOfLastTimersCalculation: '2016-08-10',
				timersConfig: [
					{ guid: '569dc9e5-8874-46bc-9e92-1c8cfbdaf0a3', weekdays: 62, title: 'Paul - game', durationMilliSecond: 5400000, durationHumanized: '01:30', picture: 'assets/images/gamepad.png', enable: true },
					{ guid: 'a99897da-1460-409b-9778-571a3c4756ae', weekdays: 192, title: 'Paul - TV', durationMilliSecond: 3600000, durationHumanized: '01:00', picture: 'assets/images/tv.png', enable: true },
					{ guid: '17913ab4-b7b2-4aba-af9f-01e6019844b3', weekdays: 254, title: 'Louis - game', durationMilliSecond: 5400000, durationHumanized: '01:30', picture: 'assets/images/gamepad.png', enable: true },
					{ guid: '4d555d07-341c-40aa-aabe-9799577ba2a6', weekdays: 6, title: 'Richard - TV', durationMilliSecond: 3600000, durationHumanized: '01:00', picture: '', enable: false },
					{ guid: 'ef8d4703-d939-4b75-a814-0157cb8ac0b5', weekdays: 126, title: 'Louis - TV', durationMilliSecond: 3600000, durationHumanized: '01:00', picture: 'assets/images/tv.png', enable: true },
					{ guid: '4d555d07-341c-40aa-aabe-9799577bz2a6', weekdays: 254, title: 'tests1', durationMilliSecond: 3000, durationHumanized: '00:03', picture: 'assets/images/tv.png', enable: true },
					{ guid: '4d555d07-341c-40aa-aabe-9799577be2a6', weekdays: 254, title: 'tests2', durationMilliSecond: 3000, durationHumanized: '00:03', picture: 'assets/images/tv.png', enable: true },
					{ guid: '4d555d07-341c-40aa-aabe-9799577br2a6', weekdays: 254, title: 'tests3', durationMilliSecond: 3000, durationHumanized: '00:03', picture: 'assets/images/tv.png', enable: true },
				]
			};
			// this.storage.setItem(constant.STORAGEKEY_KIDS, JSON.stringify(timersInit));
			this._config = config;
			this._storeConfig();

			// For each timer create an unique timerValue
			for (var timerConf in config.timersConfig) {
				this._storeTimerValue(config.timersConfig[timerConf]);
			}

			// redo the whole treatment
			this.getAll();
			console.log('1st initialisation done');
		}

		// timers should be reinitialize every day
		// Shoud we initialize the timers? Is last initialisation date today or before?
		var n = moment(Date.now());
		var d = moment(this._config.dayOfLastTimersCalculation, constant.DATE_STORE_FORMAT);
		var diff = n.diff(d);
		var duration = moment.duration(diff);
		var days = duration.asDays();

		if (days > 1) {
			// More than one day that we evaluate the timers
			this._initializeTimers();
		}

		return this._config.timersConfig;
	}

	private _initializeTimers(): void {
		console.log('_initializeTimers ....!');
		var todayDay: number = moment(Date.now()).weekday() + 1;

		for (var t in this._config.timersConfig) {
			var config: models.TimerConfig = this._config.timersConfig[t];

			// remove the persisted timer
			this.storage.removeItem(constant.STORAGEKEY_PREFIX + config.guid);

			// Is enable?
			if (config.enable) {
				// Is it a good day?
				console.log('timer today?:' + (Math.pow(2, todayDay) && config.weekdays));
				if ((Math.pow(2, todayDay) & config.weekdays) !== 0) {
					// Timer can run today
					this._storeTimerValue(config);
				}
			}
		}

		// We update the indicator of the last
		this._config.dayOfLastTimersCalculation = moment(Date.now()).format(constant.DATE_STORE_FORMAT);
		this._storeConfig();
	}

	public whenIsNext(guid: string): string {
		// 1 monday
		// 2 tuesday
		// 4 wednesday
		// 8 thursday
		// 16 friday
		// 32 saturday
		// 64 sunday

		// 40 = thurs + saturday

		// test#1: made on monday
		// test#2: made on thursday 
		// test#3: made on friday
		// test#4: made on sunday

		/** algo
		 * 		todayDayNumber => offset
		 * 			loop 7 times/days
		 * 				isThereTimerForThisDay
		 */  

		let config: models.TimerConfig = this._config.timersConfig.find((timer) => {
			return (timer.guid === guid)
		})
		let todayDay: number = moment(Date.now()).weekday() + 1;
		// let tomorrow: number = moment(Date.now()).weekday() + 2;
		if ((Math.pow(2, todayDay) & config.weekdays) !== 0) {
			// Timer can run today
			return "today";
		}
	}

	public get(guid: string): models.TimerConfig {
		this.checkConfigIsLoadedOrLoadIt();
		return this._config.timersConfig.find(timerConfig => {
			return timerConfig.guid === guid;
		});
	}

	public canBeConfigured(guid: string): boolean {
		let canBeConfigured = false;
		// cannot configure when a timer is runnning
		let timerValue = this.timerService.getTimerValue(guid)
		if (timerValue) {
			if (timerValue.status === models.enumTimerStatus.READY) {
				canBeConfigured = true;
			} else {
				canBeConfigured = false;
			}
		} else {
			canBeConfigured = true;
		}

		return canBeConfigured;
	}

	public update(timerConf: models.TimerConfig): boolean {
		this.checkConfigIsLoadedOrLoadIt();

		if (this.canBeConfigured(timerConf.guid)) {
			this._config.timersConfig[timerConf.guid] = timerConf;
			this._storeConfig();
			this.events.publish(this.eventsTimersconfigChanged, timerConf);

			return true;
		} else {
			return false
		}

	}

    /*
     * initialize a timerConfig object
     * does not store it
     */
	public new_(): models.TimerConfig {
		this.checkConfigIsLoadedOrLoadIt()
		let newConfig = {
			guid: misc.GUID_new(),
			title: '',
			durationMilliSecond: 5400000,
			durationHumanized: '',
			picture: '',
			weekdays: 192,
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
		if (this.canBeConfigured(guid)) {
			// remove the timerConfig in memory and persist
			// delete this._config.timersConfig[guid];
			let index = this._config.timersConfig.findIndex((timer) => {
				return timer.guid === guid;
			});
			this._config.timersConfig.splice(index, 1);
			this._storeConfig();

			// remove the timerValue persisted key
			this.storage.removeItem(constant.STORAGEKEY_PREFIX + guid);
			this.events.publish(this.eventsTimersconfigDeleted,guid);
			return true;
		} else {
			return false;
		}
	}

    /*
     * method to store the instance of the timerConfig array
     */
	private _storeConfig() {
		this.storage.setItem(constant.STORAGEKEY_TIMERS, JSON.stringify(this._config));
	}

    /*
     * Convert the timerConf in timerValue and store it
     * usefull for creating a new timerConfig???
     */
	private _storeTimerValue(timerConf: models.TimerConfig) {
		var timerValue: models.TimerValue = {
			guid: timerConf.guid,
			title: timerConf.title,
			durationLeft_MilliSecond: timerConf.durationMilliSecond,
			duration: timerConf.durationMilliSecond,
			status: 10
		};
		this.storage.setItem(constant.STORAGEKEY_PREFIX + timerConf.guid, JSON.stringify(timerValue));
	}

	
	private checkConfigIsLoadedOrLoadIt() {
		if (!this._config) { this.getAll(); };
	}
}


