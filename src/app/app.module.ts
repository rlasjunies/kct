import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { NativeAudio } from '@ionic-native/native-audio';
import { BackgroundMode } from '@ionic-native/background-mode';
import { TextToSpeech } from '@ionic-native/text-to-speech';

import { App } from './app.component';
import * as providers from 'providers';
import { StorageLocalProvider } from '../providers/storage-local/storage-local';
import { TtsProvider } from '../providers/tts/tts';
import { VoiceAlertProvider } from '../providers/voice-alert/voice-alert';
// import { StorageInMemoryProvider } from '../providers/storage-in-memory/storage-in-memory';

@NgModule({
    declarations: [
        App,
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(App),
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        App,
    ],
    providers: [
        StatusBar,
        SplashScreen,
        LocalNotifications,
        NativeAudio,
        BackgroundMode,
        TextToSpeech,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        providers.TimerProvider,
        providers.TimerConfigService,
        providers.SmartAudioProvider,
        providers.TimerSoundProvider,
        providers.BackgroundModeProvider,
        providers.TimerStorageProvider,
        providers.DaysEncodingProvider,
        providers.VoiceAlertProvider,
        // use for test in Memory { provide: StorageLocalProvider, useClass: StorageInMemoryProvider},
        StorageLocalProvider,
    TtsProvider,
    VoiceAlertProvider,
    ]
})
export class AppModule { }