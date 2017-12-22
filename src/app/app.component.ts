import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, App } from 'ionic-angular';
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
        private app: App,
        
    ) {
        this.initializeApp();
    }

    initializeApp = () => {
        this.platformNative.ready().then(() => {
            this.statusBarNative.hide();
            this.splashScreenNative.hide();

            this.backgroundModeP.initializationToDoWhenDeviceReady();

            this.platformNative.pause.subscribe(() => { this.backgroundModeP.dispatch('pause'); });
            this.platformNative.resume.subscribe(() => { this.backgroundModeP.dispatch('resume'); });

            this.platformNative.registerBackButtonAction((evt) => {
                // avoid app exit on back button when in home page
                // as is the back button, does not work anymore ... do not understand why
                // with this priority back should work for history, dialog, ...

                // remaining use case not solved; backbutton does not hide side menu when clicked

                const nav = this.app.getActiveNavs()[0];
                const activeView = this.nav.getActive();
                if (activeView != null) {
                    if (nav.canGoBack()) {
                        // console.log('backbutton:canGoback');
                        nav.pop();
                    } else if (typeof activeView.instance.backButtonAction === 'function') {
                        // console.log('backbutton:backbuttonAction===function');
                        activeView.instance.backButtonAction();
                    } else if (nav.parent) {
                        // parent is null when at home screen
                        // I do not understand that case
                        // console.log('backbutton:nav.parent exist');
                        nav.parent.select(0);
                    } else {
                        // does nothing .. do not want to leave the app
                        // console.log('backbutton:navparent IS NULL');
                    }
                }
            }, 1000);

        });
    }
    openCreditPage = () => {
        this.nav.push(pages.ID_credits);
    }
    openSettingPage = () => {
        this.nav.push(pages.ID_settings);
    }
}
