import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TimerConfigPage } from './timer-config';
import * as components from "components";
@NgModule({
  declarations: [
    TimerConfigPage,
  ],
  imports: [
    IonicPageModule.forChild(TimerConfigPage),
    components.DaysSelectorModule
  ],
  exports: [
    TimerConfigPage
  ]
})
export class TimerConfigModule {}
