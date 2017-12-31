import { async, TestBed, inject } from '@angular/core/testing';

import { DaysEncodingProvider } from './days-encoding';
import { } from 'jasmine';

describe('days-encoding provider', () => {

    let daysEncodingService: DaysEncodingProvider;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [],
            imports: [
            ],
            providers: [
                DaysEncodingProvider,
            ]
        });

    }));

    beforeEach(
        inject([DaysEncodingProvider], (daysEncodingProvided: DaysEncodingProvider) => {
            daysEncodingService = daysEncodingProvided;
        }));

    it('service should be created', () => {
        expect(daysEncodingService).toBeDefined();
    });

    describe('convert number to days boolean', () => {
        it('check 0', () => {
            //
            const [first, second, third, fourth, fifth, sixth, seventh] = daysEncodingService.weekdaysNumberToBooleans(0);

            //
            expect(first).toBeFalsy();
            expect(second).toBeFalsy();
            expect(third).toBeFalsy();
            expect(fourth).toBeFalsy();
            expect(fifth).toBeFalsy();
            expect(sixth).toBeFalsy();
            expect(seventh).toBeFalsy();
        });

        it('check 1 ', () => {
            //
            const [first, second, third, fourth, fifth, sixth, seventh] = daysEncodingService.weekdaysNumberToBooleans(1);

            //
            expect(first).toBeTruthy();
            expect(second).toBeFalsy();
            expect(third).toBeFalsy();
            expect(fourth).toBeFalsy();
            expect(fifth).toBeFalsy();
            expect(sixth).toBeFalsy();
            expect(seventh).toBeFalsy();
        });

        it('check 2 ', () => {
            //
            const [first, second, third, fourth, fifth, sixth, seventh] = daysEncodingService.weekdaysNumberToBooleans(2);

            //
            expect(first).toBeFalsy();
            expect(second).toBeTruthy();
            expect(third).toBeFalsy();
            expect(fourth).toBeFalsy();
            expect(fifth).toBeFalsy();
            expect(sixth).toBeFalsy();
            expect(seventh).toBeFalsy();
        });

        it('check 3 ', () => {
            //
            const [first, second, third, fourth, fifth, sixth, seventh] = daysEncodingService.weekdaysNumberToBooleans(3);

            //
            expect(first).toBeTruthy();
            expect(second).toBeTruthy();
            expect(third).toBeFalsy();
            expect(fourth).toBeFalsy();
            expect(fifth).toBeFalsy();
            expect(sixth).toBeFalsy();
            expect(seventh).toBeFalsy();
        });

        it('check 4 ', () => {
            //
            const [first, second, third, fourth, fifth, sixth, seventh] = daysEncodingService.weekdaysNumberToBooleans(4);

            //
            expect(first).toBeFalsy();
            expect(second).toBeFalsy();
            expect(third).toBeTruthy();
            expect(fourth).toBeFalsy();
            expect(fifth).toBeFalsy();
            expect(sixth).toBeFalsy();
            expect(seventh).toBeFalsy();
        });
        it('check 8', () => {
            //
            const [first, second, third, fourth, fifth, sixth, seventh] = daysEncodingService.weekdaysNumberToBooleans(8);

            //
            expect(first).toBeFalsy();
            expect(second).toBeFalsy();
            expect(third).toBeFalsy();
            expect(fourth).toBeTruthy();
            expect(fifth).toBeFalsy();
            expect(sixth).toBeFalsy();
            expect(seventh).toBeFalsy();
        });
        it('check 16 ', () => {
            //
            const [first, second, third, fourth, fifth, sixth, seventh] = daysEncodingService.weekdaysNumberToBooleans(16);

            //
            expect(first).toBeFalsy();
            expect(second).toBeFalsy();
            expect(third).toBeFalsy();
            expect(fourth).toBeFalsy();
            expect(fifth).toBeTruthy();
            expect(sixth).toBeFalsy();
            expect(seventh).toBeFalsy();
        });
        it('check 32 ', () => {
            //
            const [first, second, third, fourth, fifth, sixth, seventh] = daysEncodingService.weekdaysNumberToBooleans(32);

            //
            expect(first).toBeFalsy();
            expect(second).toBeFalsy();
            expect(third).toBeFalsy();
            expect(fourth).toBeFalsy();
            expect(fifth).toBeFalsy();
            expect(sixth).toBeTruthy();
            expect(seventh).toBeFalsy();
        });
        it('check 64 ', () => {
            //
            const [first, second, third, fourth, fifth, sixth, seventh] = daysEncodingService.weekdaysNumberToBooleans(64);

            //
            expect(first).toBeFalsy();
            expect(second).toBeFalsy();
            expect(third).toBeFalsy();
            expect(fourth).toBeFalsy();
            expect(fifth).toBeFalsy();
            expect(sixth).toBeFalsy();
            expect(seventh).toBeTruthy();
        });
        it('check 127 ', () => {
            //
            const [first, second, third, fourth, fifth, sixth, seventh] = daysEncodingService.weekdaysNumberToBooleans(127);

            //
            expect(first).toBeTruthy();
            expect(second).toBeTruthy();
            expect(third).toBeTruthy();
            expect(fourth).toBeTruthy();
            expect(fifth).toBeTruthy();
            expect(sixth).toBeTruthy();
            expect(seventh).toBeTruthy();
        });
    });

    describe('convert booleans days to number', () => {
        it('check 0', () => {
            //
            const result = daysEncodingService.weekDaysBooleansToNumber(false, false, false, false, false, false, false);

            //
            expect(result).toEqual(0);
        });
        
        it('check 1', () => {
            //
            const result = daysEncodingService.weekDaysBooleansToNumber(true, false, false, false, false, false, false);

            //
            expect(result).toEqual(1);
        });

        it('check 2', () => {
            //
            const result = daysEncodingService.weekDaysBooleansToNumber(false, true, false, false, false, false, false);

            //
            expect(result).toEqual(2);
        });

        it('check 3', () => {
            //
            const result = daysEncodingService.weekDaysBooleansToNumber(true, true, false, false, false, false, false);

            //
            expect(result).toEqual(3);
        });
        it('check 4', () => {
            //
            const result = daysEncodingService.weekDaysBooleansToNumber(false, false, true, false, false, false, false);

            //
            expect(result).toEqual(4);
        });
        it('check 8', () => {
            //
            const result = daysEncodingService.weekDaysBooleansToNumber(false, false, false, true, false, false, false);

            //
            expect(result).toEqual(8);
        });
        it('check 16', () => {
            //
            const result = daysEncodingService.weekDaysBooleansToNumber(false, false, false, false, true, false, false);

            //
            expect(result).toEqual(16);
        });
        it('check 32', () => {
            //
            const result = daysEncodingService.weekDaysBooleansToNumber(false, false, false, false, false, true, false);

            //
            expect(result).toEqual(32);
        });
        it('check 64', () => {
            //
            const result = daysEncodingService.weekDaysBooleansToNumber(false, false, false, false, false, false, true);

            //
            expect(result).toEqual(64);
        });
        it('check 127', () => {
            //
            const result = daysEncodingService.weekDaysBooleansToNumber(true, true, true, true, true, true, true);

            //
            expect(result).toEqual(127);
        });
    });

    describe('convert number days to string humanized', () => {
        it('check 0', () => {
            //
            const result = daysEncodingService.weekDaysNumberToHumanizeds(0);

            //
            expect(result).toEqual([]);
        });

        it('check 1', () => {
            //
            const result = daysEncodingService.weekDaysNumberToHumanizeds(1);

            //
            expect(result).toEqual(["Mon"]);
        });

        it('check 127', () => {
            //
            const result = daysEncodingService.weekDaysNumberToHumanizeds(127);

            //
            expect(result).toEqual(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']);
        });
    });
});