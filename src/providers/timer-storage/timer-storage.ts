import { Injectable } from '@angular/core';
import * as constant from 'app/constant';
import { TimerValue, TimerConfig, IConfig } from 'models';

/**
 * This class is just an injectable wrapper of the localStoarage
 * static object
 * /!\ I do not know how to overwrite the iterator so, it's not yet supported
 * by the injectabe :-(
 *
 * @export
 * @class TimerStorageProvider
 */
@Injectable()
export class TimerStorageProvider {

    // [key: string]: any;
    // [index: number]: string;
    // readonly length: number;

    // constructor() {
    //     // console.log('Hello TimerStorageProvider Provider');
    // }

    // public clear(): void {
    //     // window.localStorage.clear();
    // }

    public getTimerValue(key: string): TimerValue | null {
        return JSON.parse(window.localStorage.getItem(key));
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
