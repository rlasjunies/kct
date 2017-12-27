import { Injectable } from '@angular/core';

@Injectable()
export class StorageInMemoryProvider {

    public _data = {};

    setItem(key, value) {
        this._data[key] = JSON.parse(value) || '';
    }
    getItem(key) {
        return JSON.stringify(this._data[key]) || null;
    }
    removeItem(key) {
        delete this._data[key];
    }
    get length() {
        return Object.keys(this._data).length;
    }
    key(i) {
        const keys = Object.keys(this._data);
        return keys[i] || null;
    }
}
