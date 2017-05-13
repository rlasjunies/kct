import * as moment from 'moment';
import { Component } from '@angular/core';
import { NavController, IonicPage, Events } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';

import * as model from 'models';
import * as misc from 'misc/misc';
import * as constant from 'app/constant';
import * as pages from "pages";

import { TimerService } from 'providers/timer-service/timer-service';
import { TimerConfigService } from 'providers/timer-config-service/timer-config-service';

interface UITimer {
    durationLeft: moment.Duration;
    durationLeftString: string;
    guid: string;
    picture: string;
    title: string;
    status: model.enumTimerStatus;
    ready: boolean;
    hold: boolean;
    running: boolean;
    over: boolean;
    done: boolean;
}

export interface DictionaryUITimer {
    [index: string]: UITimer;
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
    templateUrl: 'timers.html',
    providers: [
        {
            provide: Storage, useFactory: () => {
                return window.localStorage;
            }
        },
        TimerService,
        TimerConfigService]
})
export class TimersPage {
    private _media: DictionaryMedia = {};
    public timers: UITimer[] = [];

    private _timerSubscription: Subscription;

    constructor(
        private navCtrl: NavController,
        private timerService: TimerService,
        private timerConfigService: TimerConfigService,

        private events: Events) {

        this.loadTimers();
        this.events.subscribe(pages.eventsTimersconfigChanged, () =>{
            console.log("Timers config has been changed should reload");
            this.loadTimers();
        })

       console.log('TimersComponent ... loaded!');
    }

    // ionViewDidLoad() {
    //     console.log('ionViewDidLoad Timers');
    // }

    // ionViewWillEnter(){
    //     console.log("I could reload here all the time");
    // }

    ngOnInit() {
        this._timerSubscription = this.timerService.notification$.subscribe(this.manageTimerNotification);
    }

    ngOnDestroy() {
        // prevent memory leak when component is destroyed
        this._timerSubscription.unsubscribe();
    }


    loadTimers(){
        // retrieve kids config
        let timersConfig: model.TimerConfig[] = this.timerConfigService.getAll();
        this.timers = [];

        // retrieve kids timer
        // for (let timerConfig in timersConfig) {
        for (let timerConfig of timersConfig) {

            // retrieve the kid configuration and value
            var timerValue = this.timerService.getTimerValue(timerConfig.guid);

            if (!timerValue) {
                // nothing to do 
            } else {
                // timer found, initialize the timer array
                var uiTimer: UITimer = {
                    guid: (<model.TimerConfig>(<any>timerConfig)).guid,
                    picture: 'assets/images/tv.png',
                    // picture: 'url(../../assets/images/rlas.png)',
                    title: timerValue.title,
                    durationLeft: moment.duration(timerValue.durationLeft_MilliSecond),
                    durationLeftString: this._durationStringFormat(moment.duration(timerValue.durationLeft_MilliSecond)),
                    status: timerValue.status,
                    ready: false,
                    hold: false,
                    running: false,
                    over: false,
                    done: false
                };
                this._statusCalcultation(uiTimer);
                this.timers.push(uiTimer);
            }
        }
 
    }

    // Command = (guid: string) => {

    //     let timer = this.helperRetrieveTimerFromGuid(guid);

    //     switch (timer.status) {
    //         case model.enumTimerStatus.READY:
    //             this.start(guid);
    //             break;
    //         case model.enumTimerStatus.HOLD:
    //             this.start(guid);
    //             break;
    //         case model.enumTimerStatus.RUNNING:
    //             this.hold(guid);
    //             break;
    //         case model.enumTimerStatus.OVER:
    //             this.acknowledge(guid);
    //             break;
    //         case model.enumTimerStatus.DONE:
    //             this.whenIsNext(guid);
    //             break;
    //         default:
    //             console.log('WRONG TIMER STATUS VALUE');
    //     }
    // }

    configure(guid: string) {
        //alert("configure the timer!");
        // this.navCtrl.push( "timer-config", {id: guid});
        // console.log(`should navigate to config timer:${ID_timerConfig}`);
        console.log(`should navigate to config timer`);
        // this.navCtrl.push(ID_timerConfig, {id: guid});
        this.navCtrl.push(pages.ID_timerConfig, { id: guid })
        // this.navCtrl.push( pages.TimerConfigPage.ID_timerConfig, {id: guid});
        // this.start(guid);
        //  console.log("pages:",pages.ID_timers);
        // console.log("should navigate to config timer", pages.ID_timerConfig);
        //console.log("should navigate to config timer");
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

    private _durationStringFormat(d: moment.Duration): string {
        return misc.ZeroPadding(d.hours(), 2) + ':' + misc.ZeroPadding(d.minutes(), 2) + ':' + misc.ZeroPadding(d.seconds(), 2);
    }

    private _statusCalcultation(timer: UITimer): void {
        switch (timer.status) {
            case model.enumTimerStatus.READY:
                timer.ready = true;
                timer.hold = false;
                timer.running = false;
                timer.over = false;
                timer.done = false;
                break;
            case model.enumTimerStatus.HOLD:
                timer.ready = false;
                timer.hold = true;
                timer.running = false;
                timer.over = false;
                timer.done = false;
                break;
            case model.enumTimerStatus.RUNNING:
                timer.ready = false;
                timer.hold = false;
                timer.running = true;
                timer.over = false;
                timer.done = false;
                break;
            case model.enumTimerStatus.OVER:
                timer.ready = false;
                timer.hold = false;
                timer.running = false;
                timer.over = true;
                timer.done = false;
                break;
            case model.enumTimerStatus.DONE:
                timer.ready = false;
                timer.hold = false;
                timer.running = false;
                timer.over = false;
                timer.done = true;
                break;
            default:
                timer.ready = false;
                timer.hold = false;
                timer.running = false;
                timer.over = false;
                timer.done = true;
        }
    }

    private helperRetrieveTimerFromGuid(guid: string): UITimer {
        return this.timers.find((value: UITimer) => {
            return value.guid === guid;
        });
    }

    private timerStarted(timerValue: model.TimerValue, timerUI: UITimer) {
        // this.scope.$on(timerValue.guid + kct.constant.TIMER_STARTED_EVENT, (evt: ng.IAngularEvent, timerValue: model.ITimerValue) => {
        console.log('timer:' + timerValue.title + '_started received');

        // Update controller datas
        timerUI.durationLeft = moment.duration(timerValue.durationLeft_MilliSecond);
        timerUI.durationLeftString = this._durationStringFormat(timerUI.durationLeft);
        timerUI.status = model.enumTimerStatus.RUNNING; // timerValue.status;
        this._statusCalcultation(timerUI);
    };

    private timerTicked(timerValue: model.TimerValue, timerUI: UITimer) {
        // this.scope.$on(timerValue.guid + kct.constant.TIMER_TICK_EVENT, (evt: ng.IAngularEvent, timerValue: model.ITimerValue) => {
        console.log('timer:' + timerValue.title + '_tick received');

        // Update controller datas

        timerUI.durationLeft = moment.duration(timerValue.durationLeft_MilliSecond);
        timerUI.durationLeftString = this._durationStringFormat(timerUI.durationLeft);
        timerUI.status = timerValue.status;
        this._statusCalcultation(timerUI);
    };

    private timerOvered(timerValue: model.TimerValue, timerUI: UITimer) {
        console.log('timer:' + timerValue.title + '_over received ...:' + JSON.stringify(timerValue));

        // Update controller datas
        timerUI.durationLeftString = this._durationStringFormat(timerUI.durationLeft);
        timerUI.status = timerValue.status;
        this._statusCalcultation(timerUI);

        // Play the alert (if not already playing)
        if (!this._media[timerUI.guid]) {

            this._media[timerUI.guid] = new Audio(constant.SOUND_OVERTIME_ALERT);
            this._media[timerUI.guid].load();
            this._media[timerUI.guid].play();

        }
    };
    private timerStopped(timerValue: model.TimerValue, timerUI: UITimer) {
        console.log('timer:' + timerValue.title + '_stopped received ...:' + JSON.stringify(timerValue));

        timerUI.durationLeft = moment.duration(timerValue.durationLeft_MilliSecond);
        timerUI.durationLeftString = this._durationStringFormat(timerUI.durationLeft);
        timerUI.status = model.enumTimerStatus.DONE;  // timerValue.status;
        this._statusCalcultation(timerUI);
    }

    private timerHeld(timerValue: model.TimerValue, timerUI: UITimer) {
        console.log('timer:' + timerValue.title + '_stopped received ...:' + JSON.stringify(timerValue));

        timerUI.durationLeft = moment.duration(timerValue.durationLeft_MilliSecond);
        timerUI.durationLeftString = this._durationStringFormat(timerUI.durationLeft);
        timerUI.status = model.enumTimerStatus.HOLD; // timerValue.status;
        this._statusCalcultation(timerUI);
    }

    private manageTimerNotification(timerNotification: model.TimerChangeNotification) {
        if (timerNotification) {
            let timerUI = this.helperRetrieveTimerFromGuid(timerNotification.value.guid);

            switch (timerNotification.value.status) {
                case model.enumTimerStatus.STARTED:
                    this.timerStarted(timerNotification.value, timerUI);
                    break;

                case model.enumTimerStatus.HOLD:
                    this.timerHeld(timerNotification.value, timerUI);
                    break;

                case model.enumTimerStatus.RUNNING:
                    this.timerTicked(timerNotification.value, timerUI);
                    break;

                case model.enumTimerStatus.OVER:
                    this.timerOvered(timerNotification.value, timerUI);

                    break;
                case model.enumTimerStatus.DONE:
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
}
