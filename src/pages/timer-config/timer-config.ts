import * as moment from 'moment';

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { IonicPage, NavController, NavParams, Events, AlertController } from 'ionic-angular';

import * as model from 'models/timer';
import * as misc from 'misc/misc';
// import * as constant from 'app/constant';

// import { TimerService } from 'providers/timer-service/timer-service';
import { TimerConfigService } from 'providers/timer-config-service/timer-config-service';

export const ID_timerConfig = "timer-config";
@IonicPage({
    name: "timer-config",
    segment: "timer-config"
})
@Component({
    templateUrl: 'timer-config.html',
    //directives: [FORM_DIRECTIVES],
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
    public wd_day0: boolean;
    public wd_day1: boolean;
    public wd_day2: boolean;
    public wd_day3: boolean;
    public wd_day4: boolean;
    public wd_day5: boolean;
    public wd_day6: boolean;

    private timerTitle = new FormControl('');
    private hoursradio = new FormControl('');
    private minutesradio = new FormControl('');
    private wd_day0ctl = new FormControl('');
    private wd_day1ctl = new FormControl('');
    private wd_day2ctl = new FormControl('');
    private wd_day3ctl = new FormControl('');
    private wd_day4ctl = new FormControl('');
    private wd_day5ctl = new FormControl('');
    private wd_day6ctl = new FormControl('');
    private enableCtl = new FormControl('');

    /* tslint:disable-next-line:no-unused-variable */
    private timerForm = new FormGroup({
        'timerTitle': this.timerTitle,
        'hoursradio': this.hoursradio,
        'minutesradio': this.minutesradio,
        'wd_day0ctl': this.wd_day0ctl,
        'wd_day1ctl': this.wd_day1ctl,
        'wd_day2ctl': this.wd_day2ctl,
        'wd_day3ctl': this.wd_day3ctl,
        'wd_day4ctl': this.wd_day4ctl,
        'wd_day5ctl': this.wd_day5ctl,
        'wd_day6ctl': this.wd_day6ctl,
        'enableCtl': this.enableCtl,
    });

    constructor(public navCtrl: NavController, public navParam: NavParams, private formBuilder: FormBuilder, private timerConfigService: TimerConfigService, private events: Events, public alerCtrl: AlertController) {
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

        // Days
        [this.wd_day0, this.wd_day1, this.wd_day2, this.wd_day3, this.wd_day4, this.wd_day5, this.wd_day6] = __convertNumberToWeekDays(this.timerConfig.weekdays);

        events.subscribe('title:change', (value: string) => {
            console.log(`title:change:${value}`);
            this.saveTimerConfig();
        });

        events.subscribe('enable:change', (checked: boolean) => {
            console.log(`enable:change:${checked}`);
            this.saveTimerConfig();
        });

        events.subscribe('hoursRadio:change', () => {
            console.log(`hoursRadio:change:${this.durationHours}-${this.durationMinutes}`);
            this.saveTimerConfig();
        });

        events.subscribe('minutesRadio:change', () => {
            console.log(`minutesRadio:change:${this.durationHours}-${this.durationMinutes}`);
            this.saveTimerConfig();
        });

        events.subscribe('wd_day0:change', (checked: boolean) => {
            console.log(`wd_day0:change${checked}`);
            this.saveTimerConfig();
        });
        events.subscribe('wd_day1:change', (checked: boolean) => {
            console.log(`wd_day1:change${checked}`);
            this.saveTimerConfig();
        });
        events.subscribe('wd_day2:change', (checked: boolean) => {
            console.log(`wd_day2:change${checked}`);
            this.saveTimerConfig();
        });
        events.subscribe('wd_day3:change', (checked: boolean) => {
            console.log(`wd_day3:change${checked}`);
            this.saveTimerConfig();
        });
        events.subscribe('wd_day4:change', (checked: boolean) => {
            console.log(`wd_day4:change${checked}`);
            this.saveTimerConfig();
        });
        events.subscribe('wd_day5:change', (checked: boolean) => {
            console.log(`wd_day5:change${checked}`);
            this.saveTimerConfig();
        });
        events.subscribe('wd_day6:change', (checked: boolean) => {
            console.log(`wd_day6:change${checked}`);
            this.saveTimerConfig();
        });

        console.log('TimerConfigPage ... loaded!');
    }


    ionViewDidLoad() {
        console.log('ionViewDidLoad Timer-config');
    }
    saveTimerConfig() {
        this.timerConfig.weekdays = __convertWeekDaysToNumber(this.wd_day0, this.wd_day1, this.wd_day2, this.wd_day3, this.wd_day4, this.wd_day5, this.wd_day6);
        this.timerConfig.durationMilliSecond = __convertToMillisecond((this.durationHours), this.durationMinutes);
        this.timerConfig.durationHumanized = __formatToDurationHumanized(this.durationHours, this.durationMinutes);
        this.timerConfigService.update(this.timerConfig);
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

function __convertNumberToWeekDays(weekDaysEncoded: number): [boolean, boolean, boolean, boolean, boolean, boolean, boolean] {
    return [
        (weekDaysEncoded & 2) === 2 ? true : false,
        (weekDaysEncoded & 4) === 4 ? true : false,
        (weekDaysEncoded & 8) === 8 ? true : false,
        (weekDaysEncoded & 16) === 16 ? true : false,
        (weekDaysEncoded & 32) === 32 ? true : false,
        (weekDaysEncoded & 64) === 64 ? true : false,
        (weekDaysEncoded & 128) === 128 ? true : false
    ];
}
function __convertWeekDaysToNumber(day0: boolean, day1: boolean, day2: boolean, day3: boolean, day4: boolean, day5: boolean, day6: boolean): number {
    return ((day0 ? 1 : 0) * 2)
        + ((day1 ? 1 : 0) * 4)
        + ((day2 ? 1 : 0) * 8)
        + ((day3 ? 1 : 0) * 16)
        + ((day4 ? 1 : 0) * 32)
        + ((day5 ? 1 : 0) * 64)
        + ((day6 ? 1 : 0) * 128);
}