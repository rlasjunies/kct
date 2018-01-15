import * as models from 'models';
import * as moment from 'moment';
import * as misc from 'misc';

export function durationHourMinSecondFormat(d: moment.Duration): string {
    return misc.ZeroPadding(d.hours(), 1) + ':' + misc.ZeroPadding(d.minutes(), 2) + ':' + misc.ZeroPadding(d.seconds(), 2);
}

export function durationHumanized(d: moment.Duration): string {
    return d.hours() + ' hour(s) and ' + d.minutes() + ' min(s).';
}
export function statusCalculation(timer: models.UITimer): void {
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
