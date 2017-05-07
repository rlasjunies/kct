import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DaysSelector } from './days-selector';
// import { DaysSelectorHelper } from "./days-selector.service";
@NgModule({
  declarations: [
    DaysSelector,
  ],
  imports: [
    IonicPageModule.forChild(DaysSelector),
  ],
  exports: [
    DaysSelector,

  ],
  providers: [
      // DaysSelectorHelper
  ]
})
export class DaysSelectorModule {}
