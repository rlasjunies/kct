import { Injectable } from '@angular/core';
import * as constants from 'app/constant';
import { TimerChangeNotification } from 'models';
import { EventsBroadcasterProvider } from 'providers';
@Injectable()
export class VoiceAlertProvider {

    constructor(private events: EventsBroadcasterProvider) {
        this.events.subscribe(constants.EVENT_TIMER_TICK, this.manageTimerNotification);

    }

    private manageTimerNotification = (timerNotification: TimerChangeNotification) => {
        // if (timerNotification) {
        //     switch (timerNotification.timerValue.status) {
        //         case models.enumTimerStatus.OVER_1ST_TIME:
        //             this.smartAudio.playLoop('sound');
        //             break;
        //         case models.enumTimerStatus.ACKNOWLEDGE:
        //             this.smartAudio.stop('sound');
        //             // alert('dans timer sound notification mgt, status over 1st time:');
        //             // alert('dans stop sound after status done');
        //             break;
        //         default:
        //             break;
        //     }
        // } else {
        //     // console.log('!!!!! timerNotification value null');
        // }
        console.log('[voice-alert:manageTimerNotification]', timerNotification);
    }
}
