import * as moment from 'moment';
import { Component } from '@angular/core';
import { NavController, IonicPage, Events } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';
// import { LocalNotifications } from '@ionic-native/local-notifications';

import * as models from 'models';
import * as misc from 'misc';
import * as constant from 'app/constant';
import * as pages from "pages";
// import * as misc from "misc/timer.misc";
 
import { TimerService } from 'providers/timer-service/timer-service';
import { TimerConfigService } from 'providers/timer-config-service/timer-config-service';

export interface DictionaryUITimer {
	[index: string]: models.UITimer
	;
}

export interface DictionaryMedia extends misc.Dictionary<any> { }
export const ID_timers = "timers";
@IonicPage(
	{
		name: "timers",
		segment: "timers"
	}
)
@Component({
	templateUrl: 'timers.page.html',
	providers: [
		// {
		// 	provide: Storage, useFactory: function() {
		// 		return window.localStorage;
		// 	}
		// },
		TimerService,
		TimerConfigService]
})
export class TimersPage {
	private _media: DictionaryMedia = {};
	public timers: models.UITimer[] = [];

	private _timerSubscription: Subscription;

	constructor(
		private navCtrl: NavController,
		private timerService: TimerService,
		private timerConfigService: TimerConfigService,
		private events: Events,
		// private localNotifications: LocalNotifications,
		// private actionsList: ActionSheetController,
		// private platform: Platform) {
		){

		this.loadTimers();
		this.events.subscribe(timerConfigService.eventsTimersconfigChanged, this.refreshListWhenTimerConfigChanged)
		this.events.subscribe(timerConfigService.eventsTimersconfigDeleted, this.refreshListWhenTimerConfigDeleted)
	}

	ngOnInit() {
		this._timerSubscription = this.timerService.notification$.subscribe(this.manageTimerNotification);
	}


	ngOnDestroy() {
		// prevent memory leak when component is destroyed
		this._timerSubscription.unsubscribe();
	}

	refreshListWhenTimerConfigChanged = () => {
		this.loadTimers();
	}
	refreshListWhenTimerConfigDeleted = (timerGuid: string) => {
		this.timers = this.timers.filter((timer) => { return timer.guid !== timerGuid });
	}

	loadTimers() {
		// retrieve kids config
		let timersConfig: models.TimerConfig[] = this.timerConfigService.getAll();
		this.timers = [];

		// retrieve kids timer
		for (let timerConfig of timersConfig) {

			// retrieve the kid configuration and value

			// check if a timer is available, init UI information in consequence if needed
			let timerValue = this.timerService.getTimerValue(timerConfig.guid);
			let durationLeft: moment.Duration = moment.duration();
			let durationLeftString: string = "";
			let timerStatus: number = 0;
			let percentageDone: number = 0;

			if (timerValue) {
				percentageDone = this.calculPercentage(timerValue.durationLeft_MilliSecond, timerValue.duration);
				durationLeft = moment.duration(timerValue.durationLeft_MilliSecond);
				durationLeftString = misc.durationHourMinSecondFormat(moment.duration(timerValue.durationLeft_MilliSecond));
				timerStatus = timerValue.status;
			}

			// Initiatilise the UITimer poco
			let UITimer: models.UITimer
				= {
					guid: (<models.TimerConfig>(<any>timerConfig)).guid,
					picture: timerConfig.picture,
					title: timerConfig.title,
					durationHumanized: misc.durationHumanized(moment.duration(timerConfig.durationMilliSecond)),
					durationLeft: durationLeft,
					durationLeftString: durationLeftString,
					weekDaysHumanized: misc.weekDaysHumanizedFromNumber(timerConfig.weekdays), 
					percentageDone: percentageDone, 
					status: timerStatus,
					ready: false,
					hold: false,
					running: false,
					over: false,
					done: false,
					alert: false,

				};
			misc.statusCalcultation(UITimer);
			this.timers.push(UITimer);

			this.orderTimers();
		}
	}

	orderTimers() {
		let timersRunnings = this.timers.filter((value) => {
			return value.status === models.enumTimerStatus.RUNNING;
		})
		let timersHold = this.timers.filter((value) => {
			return value.status === models.enumTimerStatus.HOLD;
		})
		let timersReady = this.timers.filter((value) => {
			return value.status === models.enumTimerStatus.READY;
		})

		let timerOther = this.timers.filter((value) => {
			return !( 
				(value.status === models.enumTimerStatus.RUNNING) ||
				(value.status === models.enumTimerStatus.HOLD) || 
				(value.status === models.enumTimerStatus.READY)) ;
		})

		this.timers = timersRunnings.concat(timersHold).concat(timersReady).concat(timerOther);
	}
	
	settingClicked(timer: models.UITimer) {
		console.log("Dans setting clicked", timer.guid);
		this.navCtrl.push(pages.ID_timerConfig, { id: timer.guid })
	}
	rewardClicked(timer: models.UITimer, value: number) {
		console.log("reward for timers", timer.guid, value);
	}
	penaltyClicked(timer: models.UITimer, value: number) {
		// this.navCtrl.push(pages.ID_timerConfig, { id: timer.guid })
		console.log("penalty from timers", timer.guid, value);
	}
	start(guid: string) {
		this.timerService.startTimer(guid);
	}

	hold(guid: string) {
		this.timerService.stopTimer(guid);
	}

	whenIsNext(guid: string) {
		console.log('When is next clicked!');
	}

	acknowledge(guid: string) {
		console.log('Acknowledge ' + guid + ' clicked!');
		let audio: HTMLAudioElement = this._media[guid];
		if (audio) {
			audio.pause();
			// this._media[guid].release();
			this._media[guid] = null;

		} else {
			console.log('audio not found');
		}

		this.hold(guid);
	}

	private helperRetrieveTimerFromGuid = (guid: string): models.UITimer => {
		return this.timers.find((value: models.UITimer
		) => {
			return value.guid === guid;
		});
	}

	private timerStarted(timerValue: models.TimerValue, timerUI: models.UITimer
	) {

		// this.localNotifications.schedule({
		//     id: 1,
		//     text: 'Single ILocalNotification',
		//     sound: 'file://assets/sounds/alert.m4a', // : 'file://beep.caf',
		//     //data: { secret: key }
		// });

		// this.localNotifications.schedule({
		//     id: 1,
		//     text: 'Delayed ILocalNotification',
		//     at: new Date(new Date().getTime() + 5000),
		//     led: 'FFFFFF',
		//     sound: 'file://assets/sounds/alert.m4a',
		//     icon: "file://assets/images/tv.png"
		// });


		// this.scope.$on(timerValue.guid + kct.constant.TIMER_STARTED_EVENT, (evt: ng.IAngularEvent, timerValue: model.ITimerValue) => {
		console.log('timer:' + timerValue.title + '_started received');

		// Update controller datas
		timerUI.durationLeft = moment.duration(timerValue.durationLeft_MilliSecond);
		timerUI.percentageDone = this.calculPercentage ( timerValue.durationLeft_MilliSecond, timerValue.duration);
		timerUI.durationLeftString = misc.durationHourMinSecondFormat(timerUI.durationLeft);
		timerUI.status = models.enumTimerStatus.RUNNING; // timerValue.status;
		misc.statusCalcultation(timerUI);
	};

	private timerTicked(timerValue: models.TimerValue, timerUI: models.UITimer) {
		console.log('timer:' + timerValue.title + '_tick received');

		// Update controller datas
		timerUI.durationLeft = moment.duration(timerValue.durationLeft_MilliSecond);
		timerUI.percentageDone = this.calculPercentage ( timerValue.durationLeft_MilliSecond, timerValue.duration);
		timerUI.durationLeftString = misc.durationHourMinSecondFormat(timerUI.durationLeft);
		timerUI.status = timerValue.status;
		misc.statusCalcultation(timerUI);
	};

	private timerOvered(timerValue: models.TimerValue, timerUI: models.UITimer) {
		console.log('timer:' + timerValue.title + '_over received ...:' + JSON.stringify(timerValue));

		// Update controller datas
		timerUI.percentageDone = 100;
		timerUI.durationLeftString = misc.durationHourMinSecondFormat(timerUI.durationLeft);
		timerUI.status = timerValue.status;
		misc.statusCalcultation(timerUI); 

		// Play the alert (if not already playing)
		if (!this._media[timerUI.guid]) {

			this._media[timerUI.guid] = new Audio(constant.SOUND_OVERTIME_ALERT);
			this._media[timerUI.guid].load();
			this._media[timerUI.guid].play();

		}
	};
	private timerStopped(timerValue: models.TimerValue, timerUI: models.UITimer) {
		console.log('timer:' + timerValue.title + '_stopped received ...:' + JSON.stringify(timerValue));

		timerUI.durationLeft = moment.duration(timerValue.durationLeft_MilliSecond);
		timerUI.percentageDone = this.calculPercentage ( timerValue.durationLeft_MilliSecond, timerValue.duration); timerUI.durationLeftString = misc.durationHourMinSecondFormat(timerUI.durationLeft);
		timerUI.status = models.enumTimerStatus.DONE;  // timerValue.status;
		misc.statusCalcultation(timerUI);
	}

	private timerHeld(timerValue: models.TimerValue, timerUI: models.UITimer) {
		console.log('timer:' + timerValue.title + '_stopped received ...:' + JSON.stringify(timerValue));

		timerUI.durationLeft = moment.duration(timerValue.durationLeft_MilliSecond);
		timerUI.percentageDone = this.calculPercentage ( timerValue.durationLeft_MilliSecond, timerValue.duration); timerUI.durationLeftString = misc.durationHourMinSecondFormat(timerUI.durationLeft);
		timerUI.status = models.enumTimerStatus.HOLD; // timerValue.status;
		misc.statusCalcultation(timerUI);
	}

	calculPercentage(left:number, total:number){
		return Math.round( 100*(total-left)/total)
	}
	private manageTimerNotification = (timerNotification: models.TimerChangeNotification) => {
		if (timerNotification) {
			let timerUI = this.helperRetrieveTimerFromGuid(timerNotification.value.guid);

			switch (timerNotification.value.status) {
				case models.enumTimerStatus.STARTED:
					this.timerStarted(timerNotification.value, timerUI);
					break;

				case models.enumTimerStatus.HOLD:
					this.timerHeld(timerNotification.value, timerUI);
					break;

				case models.enumTimerStatus.RUNNING:
					this.timerTicked(timerNotification.value, timerUI);
					break;

				case models.enumTimerStatus.OVER:
					this.timerOvered(timerNotification.value, timerUI);

					break;
				case models.enumTimerStatus.DONE:
					// this.WhenIsNext(timerNotification.guid);
					this.timerStopped(timerNotification.value, timerUI);
					break;

				default:
					console.log('WRONG TIMER STATUS VALUE');
			}
		} else {
			console.log('timerNotification value null');
		}
	}

	timerClicked(timer: models.UITimer, evt: Event) {
		switch (timer.status) {
			case models.enumTimerStatus.READY:
				this.start(timer.guid);
				break;
			case models.enumTimerStatus.RUNNING:
				this.hold(timer.guid);
				break;
			case models.enumTimerStatus.HOLD:
				this.start(timer.guid);
				break;
			case models.enumTimerStatus.OVER:
				this.acknowledge(timer.guid);
				break;
			default:
				break;
		}
	}
	addNewTimer() {
		this.navCtrl.push(pages.ID_timerConfig, { id: -1 })
	}
}
