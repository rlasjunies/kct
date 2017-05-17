import * as moment from "moment";
import * as model from "./index";
export interface UITimer {
    durationLeft: moment.Duration;
    durationLeftString: string;
    guid: string;
    picture: string;
    title: string;
    status: model.enumTimerStatus;
    ready: boolean;
    hold: boolean;
    running: boolean;
    over: boolean;
    done: boolean;
}