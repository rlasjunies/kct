import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { NativeAudio } from '@ionic-native/native-audio';
import { BackgroundMode } from '@ionic-native/background-mode';

import { MyApp } from './app.component';
import * as providers from 'providers';

@NgModule({
    declarations: [
        MyApp,
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
    ],
    providers: [
        StatusBar,
        SplashScreen,
        providers.TimerProvider,
        providers.TimerConfigService,
        { provide: Storage, useFactory: returnWindowLocalStorage() },
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        LocalNotifications,
        NativeAudio,
        BackgroundMode,
        providers.SmartAudioProvider,
        providers.TimerSoundProvider,
        // providers.TimerNotificationProvider,
        providers.BackgroundModeProvider,
    ]
})
export class AppModule { }

function returnWindowLocalStorage(): Function {
    return () => {
        return window.localStorage;
    };
}