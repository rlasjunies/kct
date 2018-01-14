import { Injectable } from '@angular/core';
import { BackgroundMode } from '@ionic-native/background-mode';
import { Subscription } from 'rxjs/Subscription';
import * as models from 'models';
import * as constant from 'app/constant';
import { TimerProvider } from 'providers/timer-service/timer-service';
import { Events } from 'ionic-angular';

@Injectable()
export class BackgroundModeProvider {


    private _timerSubscription: Subscription;

    constructor(
        private backgroundModeNative: BackgroundMode,
        private timerService: TimerProvider,
        private events: Events,
    ) {
        this.events.subscribe(constant.EVENT_APP_PAUSE, this.activateBackgroundMode);
        this.events.subscribe(constant.EVENT_APP_RESUME, this.disableBackgroundMode);
        this.events.subscribe(constant.EVENT_APP_READY, this.initializationToDoWhenDeviceReady);

        this._timerSubscription = this.timerService.notification$.subscribe(this.effectOnTimerNotification);
    }

    private initializationToDoWhenDeviceReady = () => {
        this.backgroundModeNative.setDefaults({
            title: 'Timers are running in background',
            text: '',
        });
        console.log('background-mode:initializationToDoWhenDeviceReady');
    }

    effectOnTimerNotification = (timerNotification: models.TimerChangeNotification) => {
        if (timerNotification) {
            switch (timerNotification.timerValue.status) {
                case models.enumTimerStatus.OVER_1ST_TIME:
                    this.disableBackgroundModeAndForegroundTheApp();
                    break;

                default:
                    break;
            }
        } else {
            // console.warn('background_mode:effectTimerNotification: timerNotification value null');
        }
    }

    private disableBackgroundModeAndForegroundTheApp() {
        this.backgroundModeNative.moveToForeground();
        this.backgroundModeNative.disable();
    }

    private disableBackgroundMode = () => {
        if (this.backgroundModeNative.isEnabled()) {
            this.backgroundModeNative.disable();
        }
        console.log('background-mode:disableBackgroundMode');
    }

    private activateBackgroundMode = () => {
        if (this.timerService.isThereAtLeastOneTimerRunning()) {
            this.backgroundModeNative.enable();
        }
        console.log('background-mode:activateBackgroundMode');
    }
}
