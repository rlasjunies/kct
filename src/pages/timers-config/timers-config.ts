import { Component } from '@angular/core';
import { IonicPage, NavController, Events } from 'ionic-angular';

import * as model from '../../models/timer';
import { TimerConfigService } from '../../providers/timer-config-service/timer-config-service';
import { TimerConfigPage } from '../timer-config/timer-config.page';

@IonicPage()
@Component({
    templateUrl: 'build/pages/timers-config/timers-config.page.html',
    providers: [
        {
            provide: Storage, useFactory: () => {
                return window.localStorage;
            }
        },
        TimerConfigService]
})
export class TimersConfigPage {
    public timersConfig: model.TimerConfig[] = [];
    public timerConfigPage: any;

    constructor(private navCtrl: NavController, private timerConfigService: TimerConfigService, private events: Events) {
        this.timersConfig = timerConfigService.getAll();
        this.timerConfigPage = TimerConfigPage;
        console.log('timers-config ... loaded');

        events.subscribe('timer-config:change', () => {
            this.timersConfig = timerConfigService.getAll();
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad TimersConfig');
    }

}