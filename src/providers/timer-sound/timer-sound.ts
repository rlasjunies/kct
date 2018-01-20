import { Injectable } from '@angular/core';
import { SmartAudioProvider } from 'providers/smart-audio/smart-audio';
import { Subscription } from 'rxjs/Subscription';
import { TimerProvider } from 'providers/timer-service/timer-service';

import * as models from 'models';
import * as constants from 'app/constant';
import { Events } from 'ionic-angular';

@Injectable()
export class TimerSoundProvider {
    private _timerSubscription: Subscription;
    constructor(
        private smartAudio: SmartAudioProvider,
        private timerService: TimerProvider,
        private events: Events
    ) {
        this.events.subscribe(constants.EVENT_TIMER_TICK, this.manageTimerNotification);

    }

    private manageTimerNotification = (timerNotification: models.TimerChangeNotification) => {
        if (timerNotification) {
            switch (timerNotification.timerValue.status) {
                case models.enumTimerStatus.OVER_1ST_TIME:
                    this.smartAudio.playLoop('sound');
                    break;
                case models.enumTimerStatus.ACKNOWLEDGE:
                    this.smartAudio.stop('sound');
                    // alert('dans timer sound notification mgt, status over 1st time:');
                    // alert('dans stop sound after status done');
                    break;
                default:
                    break;
            }
        } else {
            // console.log('!!!!! timerNotification value null');
        }
    }
}
