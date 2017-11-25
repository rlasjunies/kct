/**
 * Mock the localStorage or sessionStorage object for test purpose
 *
 * usage:
 * - window.localStorage = new StorageMock()
 * - window.sessionStorage = new StorageMock()
 *
 * @export
 * @class StorageMock
 */
export class StorageMock {
    private _storage = {};
    setItem(key, value) {
        this._storage[key] = value || '';
    }
    getItem(key) {
        return this._storage[key] || null;
    }
    removeItem(key) {
        delete this._storage[key];
    }
    get length() {
        return Object.keys(this._storage).length;
    }
    key(i) {
        const keys = Object.keys(this._storage);
        return keys[i] || null;
    }
}