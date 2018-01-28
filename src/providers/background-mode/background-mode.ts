import { Injectable } from '@angular/core';
import { BackgroundMode } from '@ionic-native/background-mode';
import * as models from 'models';
import * as constant from 'app/constant';
import { TimerProvider } from 'providers/timer-service/timer-service';
import { EventsBroadcasterProvider } from 'providers/events-broadcaster/events-broadcaster';
import { IVoiceMessage } from 'models';

@Injectable()
export class BackgroundModeProvider {

  constructor(
    private events: EventsBroadcasterProvider,
    private backgroundModeNative: BackgroundMode,
    private timerService: TimerProvider,
  ) {
    this.events.subscribe(constant.EVENT_APP_PAUSE, this.activateBackgroundMode);
    this.events.subscribe(constant.EVENT_APP_RESUME, this.disableBackgroundMode);
    this.events.subscribe(constant.EVENT_APP_READY, this.initializationToDoWhenDeviceReady);
    this.events.subscribe(constant.EVENT_TIMER_TICK, this.effectOnTimerNotification);
    this.events.subscribe(constant.EVENT_FORCE_FOREGROUND, this.foregroundTheApp);
  }

  private initializationToDoWhenDeviceReady = () => {
    this.backgroundModeNative.setDefaults({
      title: 'Timers are running in background',
      text: '',
    });
    console.log('background-mode:initializationToDoWhenDeviceReady');
  }

  effectOnTimerNotification = (timerNotification: models.TimerChangeNotification) => {
    switch (timerNotification.timerValue.status) {
      case models.enumTimerStatus.OVER_1ST_TIME:
        // this.disableBackgroundModeAndForegroundTheApp();
        this.foregroundTheApp();
        break;

      default:
        break;
    }
  }

  // private disableBackgroundModeAndForegroundTheApp() {
  //   this.backgroundModeNative.moveToForeground();
  //   console.log('[backgroundmode:disableBackgroundModeAndForegroundApp]');
  //   // this.backgroundModeNative.disable();
  // }

  private foregroundTheApp() {
    this.backgroundModeNative.wakeUp();
    this.backgroundModeNative.moveToForeground();
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
