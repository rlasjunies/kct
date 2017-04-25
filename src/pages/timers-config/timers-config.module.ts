import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TimersConfig } from './timers-config';

@NgModule({
  declarations: [
    TimersConfig,
  ],
  imports: [
    IonicPageModule.forChild(TimersConfig),
  ],
  exports: [
    TimersConfig
  ]
})
export class TimersConfigModule {}
