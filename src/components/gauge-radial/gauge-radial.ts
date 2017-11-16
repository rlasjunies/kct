import { Component, Input } from '@angular/core';
import * as models from 'models';

@Component({
	selector: 'gauge-radial',
	templateUrl: 'gauge-radial.html'
})
export class GaugeRadial {
	@Input() percentage: number = 0;

	iconName: string = "pause";

	_state:number = 0;
	@Input() set state(value: number){
		this._state = value;
		switch (this._state) {
			case models.enumTimerStatus.DONE:
				this.iconName = ""
				break;
			case models.enumTimerStatus.ALERT:
				this.iconName = "pause"
				break;
			case models.enumTimerStatus.HOLD:
				this.iconName = "play"
				break;
			case models.enumTimerStatus.OVER_1ST_TIME:
				this.iconName = "close"
				break;
			case models.enumTimerStatus.OVER:
				this.iconName = "close"
				break;
			case models.enumTimerStatus.READY:
				this.iconName = "play"
				break;
			case models.enumTimerStatus.RUNNING:
				this.iconName = "pause"
				break;
			default:
				this.iconName = ""
				break;
		}
	}

	// @Input() set percentage(value: number) {
	// 	value = value < 0 ? 0 : value;
	// 	value = value > 100 ? 100 : value;
	// 	this._percentage = value;

	// 	// this.refreshMode();K
	// }

	// @Input() set pause(value: string) {
	// 	this._pause = (value === "true");
	// 	this._running = !this._pause;
	// 	this.refreshMode()
	// }

	// refreshMode() {
	// 	if (this._percentage === 0) {
	// 		this.modeReady();
	// 	} else if (this._percentage > 0 && this._percentage < 80) {
	// 		this.modeRunning();
	// 	} else if (this._percentage >= 80 && this._percentage < 100) {
	// 		this.modeAlert();
	// 	} else if (this._percentage === 100) {
	// 		this.modeDone();
	// 	}
	// }
	// modeReady() {
	// 	if (this._running) {
	// 		this._pause = true;
	// 		this._alert = false;
	// 		this._done = false;
	// 		this.iconName = "play"
	// 	} else {
	// 		this.modePause();
	// 	}
	// }
	// modeRunning() {
	// 	if (this._running) {
	// 		this._pause = false;
	// 		this._alert = false;
	// 		this._done = false;
	// 		this.iconName = "pause"
	// 	} else {
	// 		this.modePause();
	// 	}
	// }
	// modeAlert() {
	// 	if (this._running) {
	// 		this._pause = false;
	// 		this._alert = true;
	// 		this._done = false;
	// 		this.iconName = "pause"
	// 	} else {
	// 		this.modePause();
	// 	}
	// }
	// modeDone() {
	// 	if (this._running) {
	// 		this._pause = false;
	// 		this._alert = false;
	// 		this._done = true;
	// 		this.iconName = ""
	// 	} else {
	// 		this.modePause();
	// 	}
	// }

	// modePause() {
	// 	this._pause = true;
	// 	this._alert = false;
	// 	this._done = false;
	// 	this.iconName = "play"
	// }

	constructor() { }
}
