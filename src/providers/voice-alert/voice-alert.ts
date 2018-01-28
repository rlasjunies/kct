import { Injectable } from '@angular/core';
import * as constants from 'app/constant';
import { TimerChangeNotification, IVoiceMessage, enumTimerStatus } from 'models';
import { EventsBroadcasterProvider } from 'providers';
@Injectable()
export class VoiceAlertProvider {

  constructor(private events: EventsBroadcasterProvider) {
    this.events.subscribe(constants.EVENT_TIMER_TICK, this.manageTimerNotification);
  }

  private manageTimerNotification = (timerNotification: TimerChangeNotification) => {
    switch (timerNotification.timerValue.status) {
      case enumTimerStatus.STARTED:
        this.events.publish(constants.EVENT_TTS_SAY, <IVoiceMessage>{
          text: `timer ${timerNotification.timerValue.title} started`
        });
        break;
      case enumTimerStatus.RUNNING:
        if (timerNotification.timerValue.durationLeft_MilliSecond === 300000) {
          this.events.publish(constants.EVENT_TTS_SAY, <IVoiceMessage>{
            text: `this is Games Timers, for your information the timer ${timerNotification.timerValue.title} will end in 5 minutes.`
          });
          }
        break;
      case enumTimerStatus.OVER_1ST_TIME:
        // this.smartAudio.playLoop('sound');
        this.events.publish(constants.EVENT_TTS_SAY, <IVoiceMessage>{
          text:
            `this is Games Timers, the duration for the \
            timer ${timerNotification.timerValue.title} \
            is over. Don\'t forget to acknowledge the timer`
        });
        break;
      case enumTimerStatus.ACKNOWLEDGE:
        this.events.publish(constants.EVENT_TTS_SAY, <IVoiceMessage>{ text: 'Thanks to have acknowledge the timer, See you soon!' });
        // this.smartAudio.stop('sound');
        // alert('dans timer sound notification mgt, status over 1st time:');
        // alert('dans stop sound after status done');
        break;
      default:
        break;
    }
    // console.log('[voice-alert:manageTimerNotification]', timerNotification);
  }
}
