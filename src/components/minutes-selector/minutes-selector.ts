import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'minutes-selector',
    templateUrl: 'minutes-selector.html'
})
export class MinutesSelector {

    @Input()
    minutes: number = 0;

    @Output()
    minutesChange: EventEmitter<number> = new EventEmitter()
    constructor() {}

    radioClicked($event) {
        this.minutesChange.emit(this.minutes); 
    }
}
