import { Injectable } from '@angular/core';

@Injectable()
export class StorageLocalProvider {

    setItem(key, value) {
        window.localStorage.setItem(key, value);
    }
    getItem(key) {
        return window.localStorage.getItem(key);
    }
    removeItem(key) {
        window.localStorage.removeItem(key);
    }
    get length() {
        return window.localStorage.length;
    }
    key(i) {
        return window.localStorage.key(i);
    }

}
