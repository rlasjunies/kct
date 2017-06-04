import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GaugeRadial } from './gauge-radial';

@NgModule({
  declarations: [
    GaugeRadial,
  ],
  imports: [
    IonicPageModule.forChild(GaugeRadial),
  ],
  exports: [
    GaugeRadial
  ]
})
export class GaugeRadialModule {}
