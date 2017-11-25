import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'hours-selector',
    templateUrl: 'hours-selector.html'
})
export class HoursSelector {

    @Input()
    hours = 0;

    @Output()
    hoursChange: EventEmitter<number> = new EventEmitter();
    constructor() {}

    radioClicked(evt) {
        this.hoursChange.emit(this.hours);
    }
}
