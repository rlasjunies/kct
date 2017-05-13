import * as moment from 'moment';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, AlertController } from 'ionic-angular';

import * as model from 'models/timer';
import * as misc from 'misc/misc';
import { TimerConfigService } from 'providers/timer-config-service/timer-config-service';
import * as pages from "pages";

export const ID_timerConfig = "timer-config";
@IonicPage({
    name: "timer-config",
    segment: "timer-config"
})
@Component({
    templateUrl: 'timer-config.html',
    providers: [
        {
            provide: Storage, useFactory: () => {
                return window.localStorage;
            }
        },
        TimerConfigService]
})
export class TimerConfigPage {
    static ID_timerConfig = "timer-config";
    private timerConfig: model.TimerConfig;
    public durationMinutes: number;
    public durationHours: number;

    constructor(
        public navCtrl: NavController,
        public navParam: NavParams,
        private timerConfigService: TimerConfigService,
        private events: Events,
        public alerCtrl: AlertController,
    ) {
        let id: string | number = navParam.get('id');

        if (!id) {
            console.log('TimerConfigPage: ID param missing');
        } else if (id === -1) {
            this.timerConfig = timerConfigService.new_();
        } else {
            // TODO should be passed to a control, the data Human interaction & persistance must be decoupled 
            this.timerConfig = timerConfigService.get(<string>id);
        }

        // Hours and minutes
        [this.durationHours, this.durationMinutes] = __convertMillisecondToHoursAndMinutes(this.timerConfig.durationMilliSecond);
        this.timerConfig.durationHumanized = __formatToDurationHumanized(this.durationHours, this.durationMinutes);

        events.subscribe(pages.eventsTimersconfigTitleChanged, (value: string) => {
            console.log(`title:change:${value}`);
            this.saveTimerConfig();
        });

        // console.log('TimerConfigPage ... loaded!');
    }

    minutesSelectionChanged(minutes: number) {
        this.durationMinutes = minutes;
        this.saveTimerConfig();
    }

    hoursSelectionchanged(hours: number) {
        this.durationHours = hours;
        this.saveTimerConfig();
    }

    daysSelectionChanged(days: number) {
        // console.log("Days changed:", days);
        this.timerConfig.weekdays = days;
        this.saveTimerConfig();
    }

    saveTimerConfig() {
        this.timerConfig.durationMilliSecond = __convertToMillisecond((this.durationHours), this.durationMinutes);
        this.timerConfig.durationHumanized = __formatToDurationHumanized(this.durationHours, this.durationMinutes);
        this.timerConfigService.update(this.timerConfig);
        this.events.publish(pages.eventsTimersconfigChanged); 
    }

    Delete() {
        let prompt = this.alerCtrl.create({
            title: 'Delete',
            message: `Are you sure to delete this timer:\n${this.timerConfig.title}`,
            buttons: [
                {
                    text: 'Cancel',
                    handler: data => {
                        // console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Delete',
                    handler: data => {
                        this.timerConfigService.delete(this.timerConfig.guid);
                        this.navCtrl.pop();
                    }
                }
            ]
        });
        prompt.present();
    }
}

function __formatToDurationHumanized(durationHours: number, durationMinutes: number): string {
    return misc.ZeroPadding(durationHours, 2) + ':' + misc.ZeroPadding(durationMinutes, 2);
}

function __convertToMillisecond(durationHours: number, durationMinutes: number): number {
    return moment.duration(parseInt(durationHours.toString()), 'hour').add(parseInt(durationMinutes.toString()), 'minute').asMilliseconds();
    // return  
}

function __convertMillisecondToHoursAndMinutes(durationMilliSecond: number): [number, number] {
    let duration = moment.duration(durationMilliSecond);
    return [duration.hours(), duration.minutes()];
}
