import { Injectable } from '@angular/core';
import * as constant from 'app/constant';
import { TimerValue, TimerConfig, IConfig } from 'models';

@Injectable()
export class TimerStorageProvider {

    public getTimerValue(guid: string): TimerValue | null {
        return JSON.parse(window.localStorage.getItem(constant.STORAGEKEY_PREFIX + guid));
    }

    public setTimerValue(guid: string, data: TimerValue): void {
        window.localStorage.setItem(constant.STORAGEKEY_PREFIX + guid, JSON.stringify(data));
    }
    public removeTimerValue(guid: string): void {
        window.localStorage.removeItem(constant.STORAGEKEY_PREFIX + guid);
    }

    public setConfig(config: IConfig): void {
        window.localStorage.setItem(constant.STORAGEKEY_TIMERS, JSON.stringify(config));
    }

    public getConfig(): IConfig | null {
        return JSON.parse(window.localStorage.getItem(constant.STORAGEKEY_TIMERS));
    }

    public removeConfig(): void {
        window.localStorage.removeItem(constant.STORAGEKEY_TIMERS);
    }
}
