import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { DaysEncodingProvider } from "providers";

@Component({
    selector: 'days-selector',
    templateUrl: 'days-selector.html'
})
export class DaysSelector {
    public day1 = false;
    public day2 = false;
    public day3 = false;
    public day4 = false;
    public day5 = false;
    public day6 = false;
    public day7 = false;

    public day1Text = '';
    public day2Text = '';
    public day3Text = '';
    public day4Text = '';
    public day5Text = '';
    public day6Text = '';
    public day7Text = '';

    _days: number;

    _mql: MediaQueryList;

    @Input()
    set days(days: number) {
        this._days = Number(days) || 0;

        [this.day1, this.day2, this.day3, this.day4, this.day5, this.day6, this.day7] = this.dayEncodingService.weekdaysNumberToBooleans(days);

    }
    @Output() daysSelectedChanged: EventEmitter<number> = new EventEmitter();
    constructor( private dayEncodingService: DaysEncodingProvider ) {
        this._mql = window.matchMedia('(min-width: 700px)');
        this._mql.addListener(this.calcultateSmallLargeScreenAndDefineDaysText);
        this.calcultateSmallLargeScreenAndDefineDaysText(this._mql);

        // console.log('days-seclector constructor');
    }

    calcultateSmallLargeScreenAndDefineDaysText = (mql: MediaQueryList) => {
        if (mql.matches) {
            this.day1Text = this.dayEncodingService.weekdays(1);
            this.day2Text = this.dayEncodingService.weekdays(2);
            this.day3Text = this.dayEncodingService.weekdays(3);
            this.day4Text = this.dayEncodingService.weekdays(4);
            this.day5Text = this.dayEncodingService.weekdays(5);
            this.day6Text = this.dayEncodingService.weekdays(6);
            this.day7Text = this.dayEncodingService.weekdays(7);
        } else {
            this.day1Text = this.dayEncodingService.weekdaysShort(1);
            this.day2Text = this.dayEncodingService.weekdaysShort(2);
            this.day3Text = this.dayEncodingService.weekdaysShort(3);
            this.day4Text = this.dayEncodingService.weekdaysShort(4);
            this.day5Text = this.dayEncodingService.weekdaysShort(5);
            this.day6Text = this.dayEncodingService.weekdaysShort(6);
            this.day7Text = this.dayEncodingService.weekdaysShort(7);
        }
    }

    calculate(dayToToggle: number) {
        // console.log("dayToToggle:", dayToToggle);
        // tslint:disable-next-line:no-bitwise
        this.days = this._days ^ dayToToggle;
        this.daysSelectedChanged.emit(this._days);
    }
}
