import * as moment from 'moment';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Modal, AlertController } from 'ionic-angular';

import { TimerConfigService } from 'providers/timer-config-service/timer-config-service';
import * as model from 'models';
import * as misc from 'misc/misc';
import * as pages from 'pages';


export const ID_timerConfig = 'timer-config';
@IonicPage({
    name: 'timer-config',
    segment: 'timer-config'
})
@Component({
    selector: 'page-timer-config',
    templateUrl: 'timer-config.page.html',
    providers: [
        TimerConfigService
    ]
})
export class TimerConfigPage {
    static ID_timerConfig = 'timer-config';
    public timerConfig: model.TimerConfig;
    public durationMinutes: number;
    public durationHours: number;
    private modalIcon: Modal;

    constructor(
        public navCtrl: NavController,
        public navParam: NavParams,
        private timerConfigService: TimerConfigService,
        public alerCtrl: AlertController,
        public modalController: ModalController
    ) {
        const id: string | number = navParam.get('id');

        if (!id) {
            console.log('TimerConfigPage: ID param missing');
            // error case
            // trick to avoid errors from html
            // and there move back to
            this.timerConfig = {
                guid: misc.GUID_new(),
                title: '',
                durationMilliSecond: 5400000,
                durationHumanized: '',
                icon: 'game-controller-b',
                weekdays: 1,
                enable: true
            };
            this.navCtrl.setRoot(pages.ID_timers);
        } else if (id === -1) {
            this.timerConfig = timerConfigService.new_();
        } else {
            this.timerConfig = timerConfigService.get(<string>id);
        }

        // Hours and minutes
        [this.durationHours, this.durationMinutes] = __convertMillisecondToHoursAndMinutes(this.timerConfig.durationMilliSecond);
        this.timerConfig.durationHumanized = __formatToDurationHumanized(this.durationHours, this.durationMinutes);
    }


    iconClicked() {
        this.modalIcon = this.modalController
            .create(pages.ID_IconSelection, { id: this.timerConfig.icon });

        this.modalIcon.onDidDismiss((iconSelected: string) => {
            if (iconSelected !== '') {
                this.timerConfig.icon = iconSelected;
                this.saveTimerConfig();
            }
        });

        this.modalIcon.present();
    }
    backButtonAction() {
        this.modalIcon.dismiss();
    }
    titleChange(value: string) {
        console.log('Title changed:', value);
        this.saveTimerConfig();
    }
    minutesSelectionChanged(minutes: number) {
        console.log('Minutes changed:', minutes);
        this.durationMinutes = minutes;
        this.saveTimerConfig();
    }
    hoursSelectionchanged(hours: number) {
        console.log('Hours changed:', hours);
        this.durationHours = hours;
        this.saveTimerConfig();
    }

    daysSelectionChanged(days: number) {
        console.log('Days changed:', days);
        this.timerConfig.weekdays = days;
        this.saveTimerConfig();
    }

    saveTimerConfig() {
        this.timerConfig.durationMilliSecond = __convertToMillisecond((this.durationHours), this.durationMinutes);
        this.timerConfig.durationHumanized = __formatToDurationHumanized(this.durationHours, this.durationMinutes);
        this.timerConfigService.update(this.timerConfig);
    }

    Delete() {
        const prompt = this.alerCtrl.create({
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
    return misc.ZeroPadding(durationHours, 1) + ':' + misc.ZeroPadding(durationMinutes, 2);
}

function __convertToMillisecond(durationHours: number, durationMinutes: number): number {
    return moment.duration(parseInt(durationHours.toString(), 10), 'hour')
        .add(parseInt(durationMinutes.toString(), 10), 'minute').asMilliseconds();
    // return
}

function __convertMillisecondToHoursAndMinutes(durationMilliSecond: number): [number, number] {
    const duration = moment.duration(durationMilliSecond);
    return [duration.hours(), duration.minutes()];
}
