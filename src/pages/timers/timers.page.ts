import * as moment from 'moment';
import { Component, ViewChild } from '@angular/core';
import { NavController, IonicPage, Events, Content } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';

import * as models from 'models';
import * as misc from 'misc';
import * as pages from 'pages';
import * as constants from 'app/constant';

import { TimerProvider } from 'providers/timer-service/timer-service';
import { TimerConfigService } from 'providers/timer-config-service/timer-config-service';
import { DaysEncodingProvider } from 'providers';
import { OnInit, OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { instanceAvailability } from '@ionic-native/core';
import {
    TimerChangeNotification,
    TimerChangeNotificationOverStarted,
    TimerChangeNotificationHeld,
    TimerChangeNotification1stTime,
    TimerChangeNotificationOver,
    TimerChangeNotificationAcknowledged
} from 'models';

export interface DictionaryUITimer {
    [index: string]: models.UITimer
    ;
}

export interface DictionaryMedia extends misc.Dictionary<any> { }
export const ID_timers = 'timers';
@IonicPage({
    name: 'timers',
    segment: 'timers'
}
)
@Component({
    templateUrl: 'timers.page.html',
})
// export class TimersPage implements OnInit, OnDestroy {
export class TimersPage {
    @ViewChild(Content) content: Content;
    // private _media: DictionaryMedia = {};
    public timers: models.UITimer[] = [];

    private _timerSubscription: Subscription;

    constructor(
        private navCtrl: NavController,
        private timerService: TimerProvider,
        private timerConfigService: TimerConfigService,
        private events: Events,
        private daysEncodingService: DaysEncodingProvider,
    ) {

        this.loadTimers();
        this.events.subscribe(timerConfigService.eventsTimersconfigChanged, this.refreshListWhenTimerConfigChanged);
        this.events.subscribe(timerConfigService.eventsTimersconfigDeleted, this.refreshListWhenTimerConfigDeleted);
        this.events.subscribe(constants.EVENT_TIMER_TICK, this.manageTimerNotification);
    }
    ionViewWillEnter() {
        this.content.resize();
    }

    refreshListWhenTimerConfigChanged = (timerConfig: models.TimerConfig) => {
        // console.log("timer config change", timerConfig);
        this.loadTimer(timerConfig);
        // this.orderTimers();
    }
    refreshListWhenTimerConfigDeleted = (timerGuid: string) => {
        this.timers = this.timers.filter((timer) => timer.guid !== timerGuid);
    }

    loadTimers() {
        // retrieve kids config
        const timersConfig: models.TimerConfig[] = this.timerConfigService.getAll();
        this.timers = [];

        // retrieve kids timer
        for (const timerConfig of timersConfig) {
            this.loadTimer(timerConfig);
        }
        // this.orderTimers();
    }

    loadTimer(timerConfig: models.TimerConfig) {
        // check if a timer is available, init UI information in consequence if needed
        const timerValue = this.timerService.getTimerValue(timerConfig.guid);
        let durationLeft: moment.Duration = moment.duration();
        let durationLeftString = '';
        let timerStatus = 0;
        let percentageDone = 0;

        if (timerValue) {
            percentageDone = this.calculPercentage(timerValue.durationLeft_MilliSecond, timerValue.duration);
            durationLeft = moment.duration(timerValue.durationLeft_MilliSecond);
            durationLeftString = misc.durationHourMinSecondFormat(moment.duration(timerValue.durationLeft_MilliSecond));
            timerStatus = timerValue.status;
        }

        // Initiatilise the UITimer poco
        const newUITimer: models.UITimer
            = {
                guid: (<models.TimerConfig>(<any>timerConfig)).guid,
                icon: timerConfig.icon,
                title: timerConfig.title,
                durationHumanized: misc.durationHumanized(moment.duration(timerConfig.durationMilliSecond)),
                durationLeft: durationLeft,
                durationLeftString: durationLeftString,
                weekDaysHumanized: this.daysEncodingService.weekDaysNumberToHumanizeds(timerConfig.weekdays),
                percentageDone: percentageDone,
                status: timerStatus,
                ready: false,
                hold: false,
                running: false,
                over: false,
                done: false,
                alert: false,
            };
        misc.statusCalculation(newUITimer);
        this.arrayAddOrReplaceInTimers(newUITimer);
    }

    arrayAddOrReplaceInTimers(newUITimer: models.UITimer) {
        const index = this.timers.findIndex((uiTimer: models.UITimer) => uiTimer.guid === newUITimer.guid);
        const numberToRemove = index === -1 ? 0 : 1;
        this.timers.splice(index, numberToRemove, newUITimer);
    }
    // orderTimers() {
    //     let timersRunnings = this.timers.filter((value) => {
    //         return value.status === models.enumTimerStatus.RUNNING;
    //     })
    //     let timersHold = this.timers.filter((value) => {
    //         return value.status === models.enumTimerStatus.HOLD;
    //     })
    //     let timersReady = this.timers.filter((value) => {
    //         return value.status === models.enumTimerStatus.READY;
    //     })

    //     let timerOther = this.timers.filter((value) => {
    //         return !(
    //             (value.status === models.enumTimerStatus.RUNNING) ||
    //             (value.status === models.enumTimerStatus.HOLD) ||
    //             (value.status === models.enumTimerStatus.READY));
    //     })

    //     this.timers = timersRunnings.concat(timersHold).concat(timersReady).concat(timerOther);
    // }

    settingClicked(timer: models.UITimer) {
        console.log('Dans setting clicked', timer.guid);
        this.navCtrl.push(pages.ID_timerConfig, { id: timer.guid });
    }
    rewardClicked(timer: models.UITimer, value: number) {
        console.log('reward for timers', timer.guid, value);
    }
    penaltyClicked(timer: models.UITimer, value: number) {
        // this.navCtrl.push(pages.ID_timerConfig, { id: timer.guid })
        console.log('penalty from timers', timer.guid, value);
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
        // let audio: HTMLAudioElement = this._media[guid];
        // if (audio) {
        //     audio.pause();
        //     // this._media[guid].release();
        //     this._media[guid] = null;

        // } else {
        //     console.log('audio not found');
        // }

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

        console.log('timer:' + timerValue.title + '_started received');

        // Update controller datas
        timerUI.durationLeft = moment.duration(timerValue.durationLeft_MilliSecond);
        timerUI.percentageDone = this.calculPercentage(timerValue.durationLeft_MilliSecond, timerValue.duration);
        timerUI.durationLeftString = misc.durationHourMinSecondFormat(timerUI.durationLeft);
        timerUI.status = models.enumTimerStatus.RUNNING; // timerValue.status;
        misc.statusCalculation(timerUI);
    }

    private timerTicked(timerValue: models.TimerValue, timerUI: models.UITimer) {
        console.log('timer:' + timerValue.title + '_tick received');

        // Update controller datas
        timerUI.durationLeft = moment.duration(timerValue.durationLeft_MilliSecond);
        timerUI.percentageDone = this.calculPercentage(timerValue.durationLeft_MilliSecond, timerValue.duration);
        timerUI.durationLeftString = misc.durationHourMinSecondFormat(timerUI.durationLeft);
        timerUI.status = timerValue.status;
        misc.statusCalculation(timerUI);
    }

    private timerOvered(timerValue: models.TimerValue, timerUI: models.UITimer) {
        console.log('timer:' + timerValue.title + '_over received ...:' + JSON.stringify(timerValue));

        // Update controller datas
        timerUI.percentageDone = 100;
        timerUI.durationLeftString = misc.durationHourMinSecondFormat(timerUI.durationLeft);
        timerUI.status = timerValue.status;
        misc.statusCalculation(timerUI);

        // Play the alert (if not already playing)
        // if (!this._media[timerUI.guid]) {

        //     this._media[timerUI.guid] = new Audio(constant.SOUND_OVERTIME_ALERT);
        //     this._media[timerUI.guid].load();
        //     this._media[timerUI.guid].play();
        // }
    }
    private timerStopped(timerValue: models.TimerValue, timerUI: models.UITimer) {
        console.log('timer:' + timerValue.title + '_stopped received ...:' + JSON.stringify(timerValue));

        timerUI.durationLeft = moment.duration(timerValue.durationLeft_MilliSecond);
        timerUI.percentageDone = this.calculPercentage(timerValue.durationLeft_MilliSecond, timerValue.duration);
        timerUI.durationLeftString = misc.durationHourMinSecondFormat(timerUI.durationLeft);
        timerUI.status = models.enumTimerStatus.ACKNOWLEDGE;  // timerValue.status;
        misc.statusCalculation(timerUI);
    }

    private timerHeld(timerValue: models.TimerValue, timerUI: models.UITimer) {
        console.log('timer:' + timerValue.title + '_stopped received ...:' + JSON.stringify(timerValue));

        timerUI.durationLeft = moment.duration(timerValue.durationLeft_MilliSecond);
        timerUI.percentageDone = this.calculPercentage(timerValue.durationLeft_MilliSecond, timerValue.duration);
        timerUI.durationLeftString = misc.durationHourMinSecondFormat(timerUI.durationLeft);
        timerUI.status = models.enumTimerStatus.HOLD; // timerValue.status;
        misc.statusCalculation(timerUI);
    }

    calculPercentage(left: number, total: number) {
        return Math.round(100 * (total - left) / total);
    }
    private manageTimerNotification = (timerNotification: models.TimerChangeNotification) => {
        // if (timerNotification) {
        const timerUI = this.helperRetrieveTimerFromGuid(timerNotification.timerValue.guid);

        if (timerNotification instanceof TimerChangeNotificationOverStarted) {
            this.timerStarted(timerNotification.timerValue, timerUI);

        } else if (timerNotification instanceof TimerChangeNotificationHeld) {
            this.timerHeld(timerNotification.timerValue, timerUI);

        } else if (timerNotification instanceof TimerChangeNotification1stTime) {
            this.timerOvered(timerNotification.timerValue, timerUI);

        } else if (timerNotification instanceof TimerChangeNotificationOver) {
            this.timerOvered(timerNotification.timerValue, timerUI);

        } else if (timerNotification instanceof TimerChangeNotificationAcknowledged) {
            this.timerStopped(timerNotification.timerValue, timerUI);

        } else if (timerNotification instanceof TimerChangeNotification) {
            console.log('timerNotification');
            this.timerTicked(timerNotification.timerValue, timerUI);

        } else {
            console.log('WRONG TIMER STATUS VALUE');
        }

        // switch (timerNotification.timerValue.status) {
        //     case models.enumTimerStatus.STARTED:
        //         this.timerStarted(timerNotification.timerValue, timerUI);
        //         break;

        //     case models.enumTimerStatus.HOLD:
        //         this.timerHeld(timerNotification.timerValue, timerUI);
        //         break;

        //     case models.enumTimerStatus.RUNNING:
        //         this.timerTicked(timerNotification.timerValue, timerUI);
        //         break;

        //     case models.enumTimerStatus.OVER_1ST_TIME:
        //         this.timerOvered(timerNotification.timerValue, timerUI);

        //         break;
        //     case models.enumTimerStatus.OVER:
        //         this.timerOvered(timerNotification.timerValue, timerUI);

        //         break;
        //     case models.enumTimerStatus.ACKNOWLEDGE:
        //         // this.WhenIsNext(timerNotification.guid);
        //         this.timerStopped(timerNotification.timerValue, timerUI);
        //         break;

        //     default:
        //         console.log('WRONG TIMER STATUS VALUE');
        // }
        // } else {
        //     console.log('timerNotification value null');
        // }
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
            case models.enumTimerStatus.OVER_1ST_TIME:
                this.acknowledge(timer.guid);
                break;
            case models.enumTimerStatus.OVER:
                this.acknowledge(timer.guid);
                break;
            default:
                break;
        }
    }
    addNewTimer() {
        this.navCtrl.push(pages.ID_timerConfig, { id: -1 });
    }
}
