import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-minutes-selector',
    templateUrl: 'minutes-selector.html'
})
export class MinutesSelectorComponent {

    @Input()
    minutes = 0;

    @Output()
    minutesChange: EventEmitter<number> = new EventEmitter();
    constructor() {}

    radioClicked($event) {
        this.minutesChange.emit(this.minutes);
    }
}
