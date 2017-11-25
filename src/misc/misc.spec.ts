import * as misc from 'misc/misc';

describe('Root Component', () => {

    it('should remove one record from the array', () => {
        const arr = [1, 2, 3, 4 ];
        const expectResult = [1, 2, 4];
        expect(misc.arrayRemove(arr, 3) ).toBe(expectResult);
    });

});