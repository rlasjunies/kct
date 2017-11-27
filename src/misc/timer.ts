import * as models from 'models';
import * as moment from 'moment';
import * as misc from 'misc';

export function durationHourMinSecondFormat(d: moment.Duration): string {
    return misc.ZeroPadding(d.hours(), 1) + ':' + misc.ZeroPadding(d.minutes(), 2) + ':' + misc.ZeroPadding(d.seconds(), 2);
}

export function durationHumanized(d: moment.Duration): string {
    return d.hours() + ' hour(s) and ' + d.minutes() + ' min(s).';
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
        case models.enumTimerStatus.OVER_1ST_TIME:
            timer.ready = false;
            timer.hold = false;
            timer.running = false;
            timer.over = true;
            timer.done = false;
            break;
        case models.enumTimerStatus.OVER:
            timer.ready = false;
            timer.hold = false;
            timer.running = false;
            timer.over = true;
            timer.done = false;
            break;
        case models.enumTimerStatus.ACKNOWLEDGE:
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
export function weekDaysHumanizedFromNumber(weekDays: number): string[] {
    const weekDaysHumanized: string[] = [];

    // this._days = Number(days) || 0;
    if (1 && weekDays) { weekDaysHumanized.push(moment.weekdaysShort(1)); }
    if (2 && weekDays) { weekDaysHumanized.push(moment.weekdaysShort(2)); }
    if (4 && weekDays) { weekDaysHumanized.push(moment.weekdaysShort(3)); }
    if (8 && weekDays) { weekDaysHumanized.push(moment.weekdaysShort(4)); }
    if (16 && weekDays) { weekDaysHumanized.push(moment.weekdaysShort(5)); }
    if (32 && weekDays) { weekDaysHumanized.push(moment.weekdaysShort(6)); }
    if (64 && weekDays) { weekDaysHumanized.push(moment.weekdaysShort(7)); }

    return weekDaysHumanized;
}

