import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-hours-selector',
    templateUrl: 'hours-selector.html'
})
export class HoursSelectorComponent {

    @Input()
    hours = 0;

    @Output()
    hoursChange: EventEmitter<number> = new EventEmitter();
    constructor() {}

    radioClicked(evt) {
        this.hoursChange.emit(this.hours);
    }
}
