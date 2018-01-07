import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ActionSheetController } from 'ionic-angular';
import * as models from 'models';

@Component({
    selector: 'app-timer-list-card',
    templateUrl: 'timer-list-card.html'
})

export class TimerListCardComponent {

    _timer: models.UITimer;
    @Input()
    set timer(value: models.UITimer) {
        this._timer = value;
    }

    percentage = 30;
    pause = false;

    @Output() rewardClicked: EventEmitter<number> = new EventEmitter();
    @Output() settingClicked: EventEmitter<models.UITimer> = new EventEmitter();
    @Output() penaltyClicked: EventEmitter<number> = new EventEmitter();
    @Output() clicked: EventEmitter<models.UITimer> = new EventEmitter();
    constructor(
        private actionsList: ActionSheetController,
    ) { }

    raiseSetting() {
        this.settingClicked.emit(this._timer);
    }

    raiseClick() {
        this.clicked.emit(this._timer);
    }
    raiseReward(value: number) {
        this.rewardClicked.emit(value);
    }
    showRewardSelection() {
        const actionSheet = this.actionsList.create({
            title: 'select reward',
            buttons: [
                {
                    text: '+5 min',
                    handler: () => {
                        this.raiseReward(5);
                    }
                }, {
                    text: '+10 min',
                    handler: () => {
                        this.raiseReward(10);
                    }
                }, {
                    text: '+15 min',
                    handler: () => {
                        this.raiseReward(15);
                    }
                }, {
                    text: '+30 min',
                    handler: () => {
                        this.raiseReward(30);
                    }
                }, {
                    text: '+45 min',
                    handler: () => {
                        this.raiseReward(45);
                    }
                }
            ]
        });
        actionSheet.present();
    }

    raisePenalty(value: number) {
        this.penaltyClicked.emit(value);
    }
    showPenaltySelection() {
        const actionSheet = this.actionsList.create({
            title: 'select penalty',
            buttons: [
                {
                    text: '-5 min',
                    handler: () => {
                        this.raisePenalty(5);
                    }
                }, {
                    text: '-10 min',
                    handler: () => {
                        this.raisePenalty(10);
                    }
                }, {
                    text: '-15 min',
                    handler: () => {
                        this.raisePenalty(15);
                    }
                }, {
                    text: '-30 min',
                    handler: () => {
                        this.raisePenalty(30);
                    }
                }, {
                    text: '-45 min',
                    handler: () => {
                        this.raisePenalty(45);
                    }
                }
            ]
        });
        actionSheet.present();
    }

}
