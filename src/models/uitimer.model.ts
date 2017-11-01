import * as moment from "moment";
import * as model from "./index";
export interface UITimer {
	durationHumanized: string;
	durationLeft: moment.Duration;
	percentageDone: number;
	durationLeftString: string;
	weekDaysHumanized: string[];
    guid: string;
    picture: string;
    title: string;
    status: model.enumTimerStatus;
    ready: boolean;
    hold: boolean;
    running: boolean;
    alert: boolean;
    over: boolean;
    done: boolean;
}