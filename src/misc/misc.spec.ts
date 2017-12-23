import * as misc from './misc';

describe('Misc:', () => {

    describe('Misc: arrayRemove', () => {
        it('should remove 1st record from the array', () => {
            const arr = [1, 2, 3, 4];
            const expectResult = [2, 3, 4];

            misc.arrayRemove(arr, 1);

            expect(arr).toEqual(expectResult);
        });

        it('should remove last record from the array', () => {
            const arr = [1, 2, 3, 4];
            const expectResult = [1, 2, 3];

            misc.arrayRemove(arr, 4);

            expect(arr).toEqual(expectResult);
        });

        it('should remove record in the middle from the array', () => {
            const arr = [1, 2, 3, 4];
            const expectResult = [1, 2, 4];

            misc.arrayRemove(arr, 3);

            expect(arr).toEqual(expectResult);
        });

        it('should remove string record in the middle from the array', () => {
            const arr = ['1', '2', '3', '4'];
            const expectResult = ['1', '2', '4'];

            misc.arrayRemove(arr, '3');

            expect(arr).toEqual(expectResult);
        });
    });

    describe('Misc: Guid_new', () => {
        it('should produce a string', () => {
            // arrange

            // act
            const guid = misc.GUID_new();

            // assert
            expect(typeof guid).toBe('string');
        });

        it('should produce different values', () => {
            // arrange

            // act
            const guid1 = misc.GUID_new();
            const guid2 = misc.GUID_new();

            // assert
            expect(guid1).not.toEqual(guid2);
        });
    });

    describe('ZeroPadding', () => {

        it('pad left 0 digit when less digit', () => {
            const val = misc.ZeroPadding(10, 0);

            expect(val).toEqual('');
        });

        it('pad left 0 digit when same size', () => {
            const val = misc.ZeroPadding(10, 2);

            expect(val).toEqual('10');
        });

        it('pad left 1 digit', () => {
            const val = misc.ZeroPadding(10, 5);

            expect(val).toEqual('00010');
        });

        it('pad left 10 digit', () => {
            const val = misc.ZeroPadding(10, 20);

            expect(val).toEqual('00000000000000000010');
        });

    });

});