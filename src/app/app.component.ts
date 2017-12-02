import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as providers from 'providers';
import * as pages from 'pages';
import * as models from 'models';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;
    rootPage: any = pages.ID_timers;

    constructor(
        public platformNative: Platform,
        public statusBarNative: StatusBar,
        public splashScreenNative: SplashScreen,
        private timerServiceP: providers.TimerProvider,
        private timerSoundP: providers.TimerSoundProvider,
        // private timerNotificationP: providers.TimerNotificationProvider,
        private audioP: providers.SmartAudioProvider,
        private backgroundModeP: providers.BackgroundModeProvider,

    ) {
        this.initializeApp();
    }

    initializeApp = () => {
        this.platformNative.ready().then(() => {
            this.statusBarNative.hide();
            this.splashScreenNative.hide();

            this.platformNative.pause.subscribe( () => { this.backgroundModeP.dispatch('pause'); });
            this.platformNative.resume.subscribe(() => { this.backgroundModeP.dispatch('resume'); });

        });
    }
    openCreditPage = () => {
        this.nav.push(pages.ID_credits);
    }
    openSettingPage = () => {
        this.nav.push(pages.ID_settings);
    }
}
