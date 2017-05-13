import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import * as model from "models";

export const ID_timersConfig = "timers-config";
@IonicPage(
    {
        name: "timers-config",
        segment: "timers-config"
    }
)
@Component({
    selector: 'page-timers-config',
    templateUrl: 'timers-config.html',
})
export class TimersConfig {

    public timers: model.TimerConfig[] = [];

    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad TimersConfig');
    }

}
