import { Injectable } from '@angular/core';
import { SmartAudioProvider } from "providers/smart-audio/smart-audio"
import { Subscription } from 'rxjs/Subscription';
import { TimerService } from 'providers/timer-service/timer-service';
import * as models from "models";

@Injectable()
export class TimerSoundProvider {

    private _timerSubscription: Subscription;
    constructor(
        private smartAudio: SmartAudioProvider,
        private timerService: TimerService,
    ) {
        this._timerSubscription = this.timerService.notification$.subscribe(this.manageTimerNotification);

        this.smartAudio.preload("sound", "assets/sounds/alert.m4a");
        console.log('Hello TimerSoundProvider Provider');
    }

    private manageTimerNotification = (timerNotification: models.TimerChangeNotification) => {
        if (timerNotification) {
            console.log("timerNotification from timer-sound:", timerNotification);

            switch (timerNotification.value.status) {

                case models.enumTimerStatus.OVER:
                    this.smartAudio.play("sound");
                    break;
                case models.enumTimerStatus.DONE:
                    this.smartAudio.stop("sound");
                default:
                    break;
            }
                // let timerUI = this.helperRetrieveTimerFromGuid(timerNotification.value.guid);

                // switch (timerNotification.value.status) {
                //     case models.enumTimerStatus.STARTED:
                //         this.timerStarted(timerNotification.value, timerUI);
                //         break;

                //     case models.enumTimerStatus.HOLD:
                //         this.timerHeld(timerNotification.value, timerUI);
                //         break;

                //     case models.enumTimerStatus.RUNNING:
                //         this.timerTicked(timerNotification.value, timerUI);
                //         break;

                //     case models.enumTimerStatus.OVER:
                //         this.timerOvered(timerNotification.value, timerUI);

                //         break;
                //     case models.enumTimerStatus.DONE:
                //         // this.WhenIsNext(timerNotification.guid);
                //         this.timerStopped(timerNotification.value, timerUI);
                //         break;

                //     default:
                //         console.log('WRONG TIMER STATUS VALUE');
                // }
            } else {
                console.log('timerNotification value null');
            }
        }
    }
