import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DaysSelector } from './days-selector';

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
  ]
})
export class DaysSelectorModule {}
