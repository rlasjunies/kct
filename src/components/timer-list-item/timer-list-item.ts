import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ActionSheetController } from "ionic-angular";
import * as models from 'models';
// import * as misc from 'misc/misc';
// import * as timerMisc from "misc/timer.misc";

@Component({
	selector: 'timer-list-item',
	templateUrl: 'timer-list-item.html'
})

export class TimerListItem {

	_timer: models.UITimer;
	@Input()
	set timer(value: models.UITimer) {
		this._timer = value;
	}

	@Output() rewardClicked: EventEmitter<number> = new EventEmitter()
	@Output() settingClicked: EventEmitter<models.UITimer> = new EventEmitter()
	@Output() penaltyClicked: EventEmitter<number> = new EventEmitter()
	constructor(
		private actionsList: ActionSheetController,
	) { }

	raiseSetting() {
		this.settingClicked.emit(this._timer)
	}

	raiseReward(value: number) {
		this.rewardClicked.emit(value);
	}
	showRewardSelection() {
		let actionSheet = this.actionsList.create({
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

	raisePenalty(value:number){
		this.penaltyClicked.emit(value);
	}
	showPenaltySelection() {
		let actionSheet = this.actionsList.create({
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
