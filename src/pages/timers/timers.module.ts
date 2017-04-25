import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Timers } from './timers';

@NgModule({
  declarations: [
    Timers,
  ],
  imports: [
    IonicPageModule.forChild(Timers),
  ],
  exports: [
    Timers
  ]
})
export class TimersModule {}
