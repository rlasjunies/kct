import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BackgroundMode } from '@ionic-native/background-mode';
import * as providers from 'providers';
import * as pages from 'pages';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;
    rootPage: any = pages.ID_timers;

    constructor(
        public platform: Platform,
        public statusBar: StatusBar,
        public splashScreen: SplashScreen,
        // tslint:disable-next-line:dec
        private timerService: providers.TimerService,
       private timerSound: providers.TimerSoundProvider,
       private timerNotification: providers.TimerNotificationProvider,
        private backgroundMode: BackgroundMode,
    ) {
        this.initializeApp();
    }

    initializeApp = () => {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            this.backgroundMode.enable();
        });
    }

    openCreditPage() {
        this.nav.push(pages.ID_credits);
    }
    openSettingPage() {
        this.nav.push(pages.ID_settings);
    }
}