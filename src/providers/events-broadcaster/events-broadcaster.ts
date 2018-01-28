import { Injectable } from '@angular/core';

@Injectable()
export class EventsBroadcasterProvider {

    private _threads: {} = {};

    constructor() { }

    subscribe(event: string, callback: (msg: any) => void) {
        // console.log('subscribe:init', this, callback);

        // is it a new thread?
        if (!this._threads[event]) {
            // console.log('thread does not exist');
            this._threads[event] = [];

        }

        // Add the callback to the thread
        this._threads[event].push(callback);
        // console.log('subscribe:end', this);
    }

    unsubscribe(event: string, callbackToRemove: Function) {
        // console.log('unsubscribe:init', this);

        //  does the thread exists?
        if (this._threads[event]) {
            const thread: Function[] = this._threads[event];

            this._threads[event] = thread.filter((cb) => {
                return cb !== callbackToRemove;
            });
        }
        // console.log('unsubscribe:end', this);
    }

    publish(event: string, msg?: any) {
        if (this._threads[event]) {
            const thread = this._threads[event];

            thread.forEach(callback => {
                callback(msg);
            });
        }
    }
}