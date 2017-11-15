import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as moment from "moment";

@Component({
    selector: 'days-selector',
    templateUrl: 'days-selector.html'
})
export class DaysSelector {
    public day1: boolean = false;
    public day2: boolean = false;
    public day3: boolean = false;
    public day4: boolean = false;
    public day5: boolean = false;
    public day6: boolean = false;
    public day7: boolean = false;

    public day1Text: string = "";
    public day2Text: string = "";
    public day3Text: string = "";
    public day4Text: string = "";
    public day5Text: string = "";
    public day6Text: string = "";
    public day7Text: string = "";

    _days: number;

    _mql: MediaQueryList;

    @Input()
    set days(days: number) {
        this._days = Number(days) || 0;
        this.day1 = (1 & this._days) === 1; // 2^0
        this.day2 = (2 & this._days) === 2; // 2^1
        this.day3 = (4 & this._days) === 4; // 2^2
        this.day4 = (8 & this._days) === 8; // 2^3
        this.day5 = (16 & this._days) === 16; // 2^4
        this.day6 = (32 & this._days) === 32; // 2^5
        this.day7 = (64 & this._days) === 64; // 2^6
    }
    @Output() daysSelectedChanged: EventEmitter<number> = new EventEmitter();
    constructor() {
        this._mql = window.matchMedia("(min-width: 700px)");
        this._mql.addListener(this.calcultateSmallLargeScreenAndDefineDaysText);
        this.calcultateSmallLargeScreenAndDefineDaysText(this._mql);

        console.log("days-seclector constructor");
    }

    calcultateSmallLargeScreenAndDefineDaysText = (mql: MediaQueryList) => {
        // console.log("in calcultateSmallLargeScreenAndDefineDaysText")
        if (mql.matches) {
            this.day1Text = moment.weekdays(1);
            this.day2Text = moment.weekdays(2);
            this.day3Text = moment.weekdays(3);
            this.day4Text = moment.weekdays(4);
            this.day5Text = moment.weekdays(5);
            this.day6Text = moment.weekdays(6);
            this.day7Text = moment.weekdays(7);
        } else {
            this.day1Text = moment.weekdaysShort(1);
            this.day2Text = moment.weekdaysShort(2);
            this.day3Text = moment.weekdaysShort(3);
            this.day4Text = moment.weekdaysShort(4);
            this.day5Text = moment.weekdaysShort(5);
            this.day6Text = moment.weekdaysShort(6);
            this.day7Text = moment.weekdaysShort(7);
        }
    }

    calculate(dayToToggle: number) {
        // console.log("dayToToggle:", dayToToggle);
        this.days = this._days ^ dayToToggle;
        this.daysSelectedChanged.emit(this._days);
    }
}
