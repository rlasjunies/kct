import { Injectable } from '@angular/core';

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

    public getItem(key: string): string | null {
        return window.localStorage.getItem(key);
        // return null;
    }

    // public key(index: number): string | null {
    //     return window.localStorage.key(index);
    // }

    public removeItem(key: string): void {
        window.localStorage.removeItem(key);
    }
    public setItem(key: string, data: string): void {
        window.localStorage.setItem(key, data);
    }

}
