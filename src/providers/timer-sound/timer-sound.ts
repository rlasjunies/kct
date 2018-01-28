import { Injectable } from '@angular/core';
import { SmartAudioProvider } from 'providers/smart-audio/smart-audio';

import * as models from 'models';
import * as constants from 'app/constant';
import { EventsBroadcasterProvider } from 'providers/events-broadcaster/events-broadcaster';

@Injectable()
export class TimerSoundProvider {
    constructor(
        private events: EventsBroadcasterProvider,
        private smartAudio: SmartAudioProvider,
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
