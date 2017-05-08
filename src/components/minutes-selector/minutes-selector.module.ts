import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MinutesSelector } from './minutes-selector';

@NgModule({
  declarations: [
    MinutesSelector,
  ],
  imports: [
    IonicPageModule.forChild(MinutesSelector),
  ],
  exports: [
    MinutesSelector
  ]
})
export class MinutesSelectorModule {}
