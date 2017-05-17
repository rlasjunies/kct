
export interface IConfig {
    dayOfLastTimersCalculation: string;
    timersConfig: TimerConfig[];
}

export interface TimerConfig {
    guid: string;
    durationMilliSecond: number;
    durationHumanized: string;
    title: string;
    picture: string;
    weekdays: number;
    enable: boolean;
}

export enum enumTimerStatus {
    READY = 10, // : green,
    HOLD = 20, // : blue,
    RUNNING = 30, // : yellow,
    OVER = 40, // : orange,
    DONE = 50, // : grey
    STARTED = 60
}

export function enumTimerStatus_String(val: enumTimerStatus): string {
    switch (val) {
        case enumTimerStatus.READY:
            return 'READY';
        case enumTimerStatus.HOLD:
            return 'HOLD';
        case enumTimerStatus.RUNNING:
            return 'RUNNING';
        case enumTimerStatus.OVER:
            return 'OVER';
        case enumTimerStatus.DONE:
            return 'DONE';
        default:
            return 'WRONG TIMER STATUS VALUE';
    }
}

export interface TimerValue {
    guid: string;
    durationLeft_MilliSecond: number;
    title: string;
    status: enumTimerStatus;
}

export class TimerChangeNotification {
    constructor(public guid: string, public value: TimerValue) {
    }
}