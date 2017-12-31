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
import { StorageLocalProvider } from '../providers/storage-local/storage-local';
// import { StorageInMemoryProvider } from '../providers/storage-in-memory/storage-in-memory';

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
        LocalNotifications,
        NativeAudio,
        BackgroundMode,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        providers.TimerProvider,
        providers.TimerConfigService,
        providers.SmartAudioProvider,
        providers.TimerSoundProvider,
        providers.BackgroundModeProvider,
        providers.TimerStorageProvider,
        providers.DaysEncodingProvider,
        // use for test in Memory { provide: StorageLocalProvider, useClass: StorageInMemoryProvider},
        StorageLocalProvider,
    ]
})
export class AppModule { }