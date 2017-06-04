import { Component, Input } from '@angular/core';

@Component({
  selector: 'gauge-radial',
  templateUrl: 'gauge-radial.html'
})
export class GaugeRadial {

    _progress: number = 0;
  @Input() 
  set progress(value:number) {
      this._progress = value % 101;
  }

  constructor() {
  }

  forward(){
      this.progress = this._progress + 10;
      console.log("forward:",this._progress)
  }

}
