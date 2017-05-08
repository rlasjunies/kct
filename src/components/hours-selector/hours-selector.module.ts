import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HoursSelector } from './hours-selector';

@NgModule({
  declarations: [
    HoursSelector,
  ],
  imports: [
    IonicPageModule.forChild(HoursSelector),
  ],
  exports: [
    HoursSelector
  ]
})
export class HoursSelectorModule {}
