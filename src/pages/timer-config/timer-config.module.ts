import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TimerConfig } from './timer-config';

@NgModule({
  declarations: [
    TimerConfig,
  ],
  imports: [
    IonicPageModule.forChild(TimerConfig),
  ],
  exports: [
    TimerConfig
  ]
})
export class TimerConfigModule {}
