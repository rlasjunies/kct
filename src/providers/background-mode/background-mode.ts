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

    public dispatch = (event: string) => {
        this._notification.next(event);
    }

    effectOnBackgroundModeEvents = (event: string) => {
        switch (event) {
            case 'pause':
                if (this.timerP.isThereAtLeastOneTimerRunning()) {
                    this.backgroundModeNative.configure({
                        text: 'Timers are running in background',
                        ticker: 'This is a ticker',
                        title: 'Titel of the background task',
                        bigText: true,
                    });
                    this.backgroundModeNative.enable();
                }
                break;

            case 'resume':
                if (this.backgroundModeNative.isEnabled()) {
                    this.backgroundModeNative.disable();
                }
                break;
            default:
                break;
        }
    }

    effectOnTimerNotification = (timerNotification: models.TimerChangeNotification) => {
        if (timerNotification) {
            switch (timerNotification.timerValue.status) {
                case models.enumTimerStatus.OVER_1ST_TIME:
                    this.backgroundModeNative.moveToForeground();
                    this.backgroundModeNative.disable();
                    break;
                default:
                    break;
            }
        } else {
            console.warn('background_mode:effectTimerNotification: timerNotification value null');
        }
    }
}
