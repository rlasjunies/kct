import * as misc from './misc';

describe('Misc provider', () => {

    it('should remove 1st record from the array', () => {
        const arr = [1, 2, 3, 4 ];
        const expectResult = [2, 3, 4];

        misc.arrayRemove(arr, 1);

        expect(arr).toEqual(expectResult);
    });

    it('should remove last record from the array', () => {
        const arr = [1, 2, 3, 4 ];
        const expectResult = [1, 2, 3];

        misc.arrayRemove(arr, 4);

        expect(arr).toEqual(expectResult);
    });

    it('should remove record in the middle from the array', () => {
        const arr = [1, 2, 3, 4 ];
        const expectResult = [1, 2, 4];

        misc.arrayRemove(arr, 3);

        expect(arr).toEqual(expectResult);
    });

    it('should remove string record in the middle from the array', () => {
        const arr = ['1', '2', '3', '4' ];
        const expectResult = ['1', '2', '4'];

        misc.arrayRemove(arr, '3');

        expect(arr).toEqual(expectResult);
    });

});