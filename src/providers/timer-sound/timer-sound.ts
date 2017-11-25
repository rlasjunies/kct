import { Injectable } from '@angular/core';
import { SmartAudioProvider } from 'providers/smart-audio/smart-audio';
import { Subscription } from 'rxjs/Subscription';
import { TimerService } from 'providers/timer-service/timer-service';

import * as models from 'models';

@Injectable()
export class TimerSoundProvider {
    private _timerSubscription: Subscription;
    constructor(
        private smartAudio: SmartAudioProvider,
        private timerService: TimerService,
    ) {
        this._timerSubscription = this.timerService.notification$.subscribe(this.manageTimerNotification);

        this.smartAudio.preload('sound', 'assets/sounds/alert.m4a');
        console.log('Hello TimerSoundProvider Provider');
    }

    private manageTimerNotification = (timerNotification: models.TimerChangeNotification) => {
        if (timerNotification) {
            console.log('timerNotification from timer-sound:', timerNotification);

            switch (timerNotification.timerValue.status) {

                case models.enumTimerStatus.OVER_1ST_TIME:
                    this.smartAudio.play('sound');
                    break;
                case models.enumTimerStatus.DONE:
                    this.smartAudio.stop('sound');
                    break;
                default:
                    break;
            }
        } else {
            console.log('!!!!! timerNotification value null');
        }
    }
}
