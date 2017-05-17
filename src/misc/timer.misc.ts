import * as models from "models";
import * as moment from "moment";
import * as misc from "misc/misc";

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

