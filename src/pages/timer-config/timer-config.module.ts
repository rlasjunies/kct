import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TimerConfigPage } from './timer-config';

@NgModule({
  declarations: [
    TimerConfigPage,
  ],
  imports: [
    IonicPageModule.forChild(TimerConfigPage),
  ],
  exports: [
    TimerConfigPage
  ]
})
export class TimerConfigModule {}
