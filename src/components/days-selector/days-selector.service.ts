import {Injectable} from "@angular/core";

@Injectable()
export class DaysSelectorHelper{
    public __convertNumberToWeekDays(weekDaysEncoded: number): [boolean, boolean, boolean, boolean, boolean, boolean, boolean] {
    return [
        (weekDaysEncoded & 2) === 2 ? true : false,
        (weekDaysEncoded & 4) === 4 ? true : false,
        (weekDaysEncoded & 8) === 8 ? true : false,
        (weekDaysEncoded & 16) === 16 ? true : false,
        (weekDaysEncoded & 32) === 32 ? true : false,
        (weekDaysEncoded & 64) === 64 ? true : false,
        (weekDaysEncoded & 128) === 128 ? true : false
    ];
}
public __convertWeekDaysToNumber(day0: boolean, day1: boolean, day2: boolean, day3: boolean, day4: boolean, day5: boolean, day6: boolean): number {
    return ((day0 ? 1 : 0) * 2)
        + ((day1 ? 1 : 0) * 4)
        + ((day2 ? 1 : 0) * 8)
        + ((day3 ? 1 : 0) * 16)
        + ((day4 ? 1 : 0) * 32)
        + ((day5 ? 1 : 0) * 64)
        + ((day6 ? 1 : 0) * 128);
}
}