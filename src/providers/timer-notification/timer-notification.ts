// import { Injectable } from '@angular/core';
// import { Subscription } from 'rxjs/Subscription';
// import { TimerProvider } from 'providers/timer-service/timer-service';
// import { LocalNotifications } from '@ionic-native/local-notifications';
// import { BackgroundMode } from '@ionic-native/background-mode';
// import { SmartAudioProvider } from 'providers/smart-audio/smart-audio';
// import * as models from 'models';


// @Injectable()
// export class TimerNotificationProvider {
//     private _timerSubscription: Subscription;
//     constructor(
//         private timerService: TimerProvider,
//         private localNotification: LocalNotifications,
//         private backgroundMode: BackgroundMode,
//         private smartAudio: SmartAudioProvider,
//     ) {
//         this._timerSubscription = this.timerService.notification$.subscribe(this.manageTimerNotification);

//         console.log('Hello TimerNotificationProvider Provider');
//     }
//     private manageTimerNotification = (timerNotification: models.TimerChangeNotification) => {
//         if (timerNotification) {
//             // console.log('timerNotification from timer-sound:', timerNotification);

//             switch (timerNotification.timerValue.status) {

//                 case models.enumTimerStatus.OVER_1ST_TIME:

//                     // TODO remove the notification when the timer is ack by another way
//                     // TODO check id the app is in background
//                     // this.localNotification.on('click', () => {
//                     //     // need to foreground, if not the sound is not stopped
//                     //     this.backgroundMode.moveToForeground();
//                     //     this.smartAudio.stop('sound');
//                     // });
//                     // this.localNotification.schedule({
//                     //     title: 'The timer: "' + timerNotification.timerValue.title + '" is over',
//                     //     text: 'Tap on this notification to stop the alarm'
//                     // });
//                     break;
//                 default:
//                     break;
//             }
//         } else {
//             //  console.log('!!!!! timerNotification value null');
//         }
//     }
// }
