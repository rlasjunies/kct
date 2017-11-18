import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TimerConfigService } from "providers/timer-config-service/timer-config-service";

export const ID_settings = "settings";

@IonicPage({
    name: "settings",
    segment: "settings"
})
@Component({
    selector: 'page-settings',
    templateUrl: 'settings.html',
})
export class SettingsPage {

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private timerConfigService: TimerConfigService,
    ) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad SettingsPage');
    }

    resetData() {
        this.timerConfigService.reinitializeAll();
    }

}
