import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { weekdays } from 'moment';

@Injectable()
export class DaysEncodingProvider {

    public weekdaysNumberToBooleans(weekDaysEncoded: number): [boolean, boolean, boolean, boolean, boolean, boolean, boolean] {

        return [
            (weekDaysEncoded & 1) === 1,
            (weekDaysEncoded & 2) === 2,
            (weekDaysEncoded & 4) === 4,
            (weekDaysEncoded & 8) === 8,
            (weekDaysEncoded & 16) === 16,
            (weekDaysEncoded & 32) === 32,
            (weekDaysEncoded & 64) === 64
        ];
    }

    // tslint:disable-next-line:max-line-length
    public weekDaysBooleansToNumber(day1: boolean, day2: boolean, day3: boolean, day4: boolean, day5: boolean, day6: boolean, day7: boolean): number {

        return (
            (day1 ? 1 : 0)
            + (day2 ? 2 : 0)
            + (day3 ? 4 : 0)
            + (day4 ? 8 : 0)
            + (day5 ? 16 : 0)
            + (day6 ? 32 : 0)
            + (day7 ? 64 : 0));
    }

    public weekDaysNumberToHumanizeds(weekDaysNumber: number): string[] {
        const weekDaysHumanized: string[] = [];

        const weekDaysBooleansArray = this.weekdaysNumberToBooleans(weekDaysNumber)

        weekDaysBooleansArray.map((daySelected: boolean, index: number) => {
            if (daySelected) {
                weekDaysHumanized.push(this.weekdaysShort(index + 1));
            }
        })

        return weekDaysHumanized;
    }

    public weekdaysShort(number): string {
        return moment.weekdaysShort(number);
    }
    public weekdays(number): string {
        return moment.weekdays(number);
    }
}