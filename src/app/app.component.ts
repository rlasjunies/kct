import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LocalNotifications } from '@ionic-native/local-notifications';

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
		
		private app: App
        
    ) {
        this.initializeApp();
    }

    initializeApp = () => {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
			this.statusBar.styleDefault();
			let nav = this.app.getRootNav(); 
			nav.setRoot(pages.ID_timers);
			nav.goToRoot();
			this.splashScreen.hide();
            console.log('initilizeApp - platform ... ready!');
        });

        this.platform.pause.subscribe( this.pausing ); 
        this.platform.resume.subscribe( this.resuming ); 
    }
    openCreditPage() {
        this.nav.push(pages.ID_credits);
    }

    pausing = (evt:Event) => {
        this.localNotifications.schedule({
            text: 'Delayed local notification from pausing',
            at: new Date(new Date().getTime() + 5000),
            led: 'FF0000',
            icon: "file://assets/images/tv.png"
        });
    }
    resuming = (evt:Event) => {

    }
}