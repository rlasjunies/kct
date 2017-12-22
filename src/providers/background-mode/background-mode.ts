import { Injectable } from '@angular/core';
import { BackgroundMode } from '@ionic-native/background-mode';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import * as models from 'models';
import { TimerProvider } from 'providers';

@Injectable()
export class BackgroundModeProvider {
    private _notification = new BehaviorSubject<string>(null);
    notification$ = this._notification.asObservable();

    private _timerSubscription: Subscription;

    constructor(
        private backgroundModeNative: BackgroundMode,
        private timerP: TimerProvider,
    ) {
        this._notification.subscribe(this.effectOnBackgroundModeEvents);
        this._timerSubscription = this.timerP.notification$.subscribe(this.effectOnTimerNotification);
    }

    public initializationToDoWhenDeviceReady() {
        this.backgroundModeNative.setDefaults({
            title: 'Timers are running in background',
            text: '',
        });
    }

    public dispatch = (event: string) => {
        this._notification.next(event);
    }

    effectOnBackgroundModeEvents = (event: string) => {
        // console.log('effectOnBackgroundMoveEvents:', event);
        switch (event) {
            case 'pause':
                this.activateBackgroundMode();
                break;

            case 'resume':
                this.disableBackgroundMode();
                break;

            default:
                break;
        }
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

    private disableBackgroundMode() {
        if (this.backgroundModeNative.isEnabled()) {
            this.backgroundModeNative.disable();
        }
    }

    private activateBackgroundMode() {
        // console.log('... activateBackgroundMode');
        if (this.timerP.isThereAtLeastOneTimerRunning()) {
            console.log('.... setDefaults');
            this.backgroundModeNative.enable();
        }
    }
}
