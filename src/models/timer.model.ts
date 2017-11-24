
export interface IConfig {
    dayOfLastTimersCalculation: string;
    timersConfig: TimerConfig[];
}

export interface TimerConfig {
    guid: string;
    durationMilliSecond: number;
    durationHumanized: string;
    title: string;
    icon: string;
	weekdays: number;
    enable: boolean;
}

export enum enumTimerStatus {
    READY = 10, // : green,
    HOLD = 20, // : blue,
    RUNNING = 30, // : yellow,
    OVER_1ST_TIME = 35, // : orange,
    OVER = 40, // : orange,
    DONE = 50, // : grey
    STARTED = 60,
    ALERT = 70 //
}

export function enumTimerStatus_String(val: enumTimerStatus): string {
    switch (val) {
        case enumTimerStatus.READY:
            return 'READY';
        case enumTimerStatus.HOLD:
            return 'HOLD';
        case enumTimerStatus.RUNNING:
            return 'RUNNING';
        case enumTimerStatus.OVER_1ST_TIME:
            return 'OVER_AST_TIME';
        case enumTimerStatus.OVER:
            return 'OVER';
        case enumTimerStatus.DONE:
            return 'DONE';
        case enumTimerStatus.ALERT:
            return 'ALERT';
        default:
            return 'WRONG TIMER STATUS VALUE';
    }
}

export interface TimerValue {
    guid: string;
    durationLeft_MilliSecond: number;
	duration: number;
    title: string;
    status: enumTimerStatus;
}

export class TimerChangeNotification {
    constructor(public guidEvent: string, public timerValue: TimerValue) {
    }
}