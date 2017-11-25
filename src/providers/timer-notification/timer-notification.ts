import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { TimerService } from 'providers/timer-service/timer-service';
import { LocalNotifications } from "@ionic-native/local-notifications";
import * as models from "models";


@Injectable()
export class TimerNotificationProvider {
    private _timerSubscription: Subscription;
    constructor(
        private timerService: TimerService,
        private localNotification: LocalNotifications,
    ) {
        this._timerSubscription = this.timerService.notification$.subscribe(this.manageTimerNotification);

        console.log('Hello TimerNotificationProvider Provider');
    }
    private manageTimerNotification = (timerNotification: models.TimerChangeNotification) => {
        if (timerNotification) {
            console.log("timerNotification from timer-sound:", timerNotification);

            switch (timerNotification.timerValue.status) {

                case models.enumTimerStatus.OVER_1ST_TIME:
                    this.localNotification.on("click", () => {
                        // alert("j'ai clické");
                        // if (this.timerService.isTimerActiveAndRunning(timerNotification.guid)) {
                            this.timerService.stopTimer(timerNotification.timerValue.guid);
                        // }
                    });
                    this.localNotification.schedule({
                        title: "The timer: " + timerNotification.timerValue.title + " is over",
                        text: "Tap on this notification to stop the alarm"
                    });
                    break;
                default:
                    break;
            }
        }
        else {
            console.log('!!!!! timerNotification value null');
        }
    }
}
