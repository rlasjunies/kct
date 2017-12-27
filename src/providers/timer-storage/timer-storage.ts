import { Injectable } from '@angular/core';
import * as constant from 'app/constant';
import { TimerValue, TimerConfig, IConfig } from 'models';
// import { StorageInMemoryProvider } from 'providers/storage-in-memory/storage-in-memory';
import { StorageLocalProvider } from 'providers/storage-local/storage-local';

@Injectable()
export class TimerStorageProvider {

    constructor(private storage: StorageLocalProvider) { }

    public getTimerValue(guid: string): TimerValue | null {
        return JSON.parse(this.storage.getItem(constant.STORAGEKEY_PREFIX + guid));
    }

    public setTimerValue(guid: string, data: TimerValue): void {
        this.storage.setItem(constant.STORAGEKEY_PREFIX + guid, JSON.stringify(data));
    }
    public removeTimerValue(guid: string): void {
        this.storage.removeItem(constant.STORAGEKEY_PREFIX + guid);
    }

    public setConfig(config: IConfig): void {
        this.storage.setItem(constant.STORAGEKEY_TIMERS, JSON.stringify(config));
    }

    public getConfig(): IConfig | null {
        return JSON.parse(this.storage.getItem(constant.STORAGEKEY_TIMERS));
    }

    public removeConfig(): void {
        this.storage.removeItem(constant.STORAGEKEY_TIMERS);
    }
}
