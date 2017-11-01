import * as models from "models";
import * as moment from "moment";
import * as misc from "misc"; 

export function durationStringFormat(d: moment.Duration): string {
    return misc.ZeroPadding(d.hours(), 2) + ':' + misc.ZeroPadding(d.minutes(), 2) + ':' + misc.ZeroPadding(d.seconds(), 2);
}
export function statusCalcultation(timer: models.UITimer): void {
    switch (timer.status) {
        case models.enumTimerStatus.READY:
            timer.ready = true;
            timer.hold = false;
            timer.running = false;
            timer.over = false;
            timer.done = false;
            break;
        case models.enumTimerStatus.HOLD:
            timer.ready = false;
            timer.hold = true;
            timer.running = false;
            timer.over = false;
            timer.done = false;
            break;
        case models.enumTimerStatus.RUNNING:
            timer.ready = false;
            timer.hold = false;
            timer.running = true;
            timer.over = false;
            timer.done = false;
            break;
        case models.enumTimerStatus.OVER:
            timer.ready = false;
            timer.hold = false;
            timer.running = false;
            timer.over = true;
            timer.done = false;
            break;
        case models.enumTimerStatus.DONE:
            timer.ready = false;
            timer.hold = false;
            timer.running = false;
            timer.over = false;
            timer.done = true;
            break;
        default:
            timer.ready = false;
            timer.hold = false;
            timer.running = false;
            timer.over = false;
            timer.done = true;
    }
}

export function weekDaysHumanizedFromNumber(weekDays:number):string[]{
	let weekDaysHumanized:string[] = [];

	// this._days = Number(days) || 0;
	if(1 & weekDays) { weekDaysHumanized.push(moment.weekdaysShort(1)) }
	if(2 & weekDays) { weekDaysHumanized.push(moment.weekdaysShort(2)) }
	if(4 & weekDays) { weekDaysHumanized.push(moment.weekdaysShort(4)) }
	if(8 & weekDays) { weekDaysHumanized.push(moment.weekdaysShort(8)) }
	if(16 & weekDays) { weekDaysHumanized.push(moment.weekdaysShort(16)) }
	if(32 & weekDays) { weekDaysHumanized.push(moment.weekdaysShort(32)) }
	if(64 & weekDays) { weekDaysHumanized.push(moment.weekdaysShort(64)) }

	return weekDaysHumanized;
}

