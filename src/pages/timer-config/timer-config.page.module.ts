import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TimerConfigPage } from './timer-config.page';
import * as components from 'components';
@NgModule({
  declarations: [
    TimerConfigPage,
  ],
  imports: [
    IonicPageModule.forChild(TimerConfigPage),
    components.DaysSelectorModule,
    components.HoursSelectorModule,
    components.MinutesSelectorModule,
  ],
  exports: [
    TimerConfigPage
  ]
})
export class TimerConfigModule {}
