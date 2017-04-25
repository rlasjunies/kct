
export interface DictionaryAny {
    [name: string]: any;
}

export interface Dictionary<T> {
    [name: string]: T;
}

/* Returns the class name of the argument or undefined if
* it's not a valid JavaScript object.
*/
export function getObjectClass(obj): string {
    if (obj && obj.constructor && obj.constructor.toString) {
        var arr = obj.constructor.toString().match(
            /function\s*(\w+)/);

        if (arr && arr.length === 2) {
            return arr[1];
        }
    }

    return undefined;
}

export function GUID_new(): string {
    var guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
    return guid;
};

/**
 * Zero padding (add 0 char on the left of a number i.e.: ZeroPadding(9,2) => "09"
 *
 * @num number to pad
 * @size size of the returned string
 */
export function ZeroPadding(num: number, size: number): string {
    var s: string = '000000000000' + num;
    return s.substr(s.length - size);
}

// /* Wait the end of several promises
//  *      var fb = new Firebase("https://examples-sql-queries.firebaseio.com/");
//  *       fb.child('user/123').once('value', function(userSnap) {
//  *           fb.child('media/123').once('value', function(mediaSnap) {
//  *               console.log( extend({}, userSnap.val(), mediaSnap.val()) );
//  *           });
//  *       });
//  */
// export function extend(base) {
//     var parts = Array.prototype.slice.call(arguments, 1);
//     parts.forEach(function (p) {
//         if (p && typeof (p) === 'object') {
//             for (var k in p) {
//                 if (p.hasOwnProperty(k)) {
//                     base[k] = p[k];
//                 }
//             }
//         }
//     });
//     return base;
// }