import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GaugeRadialComponent } from './gauge-radial';

@NgModule({
  declarations: [
    GaugeRadialComponent,
  ],
  imports: [
    IonicPageModule.forChild(GaugeRadialComponent),
  ],
  exports: [
    GaugeRadialComponent
  ]
})
export class GaugeRadialModule {}
