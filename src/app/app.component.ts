import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { BackgroundMode } from "@ionic-native/background-mode";
import * as providers from "providers";
import * as pages from "pages";

@Component({
    templateUrl: "app.html"
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;
    rootPage: any = pages.ID_timers;

    constructor(
        public platform: Platform,
        public statusBar: StatusBar,
        public splashScreen: SplashScreen,
        private localNotifications: LocalNotifications,
        private timerService: providers.TimerService,
        private timerSound: providers.TimerSoundProvider,
        private backgroundMode: BackgroundMode,
    ) {
        this.initializeApp();
    }

    initializeApp = () => {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            this.backgroundMode.enable();
            console.log('initilizeApp - platform ... ready!');
        });
    }

    openCreditPage() {
        this.nav.push(pages.ID_credits);
    }
    openSettingPage() {
        this.nav.push(pages.ID_settings);
    }


}