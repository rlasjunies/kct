import { Component, Input } from '@angular/core';

@Component({
    selector: 'gauge-radial',
    templateUrl: 'gauge-radial.html'
})
export class GaugeRadial {
    _progress: number = 0;
    @Input() iconName:string = "pause";


    @Input()
    set progress(value: number) {
        value = value < 0 ? 0 : value;
        value = value > 100 ? 100 : value;
        this._progress = value;
    }


    constructor() {}
}
