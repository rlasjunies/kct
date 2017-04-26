import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TimersPage } from './timers';

@NgModule({
  declarations: [
    TimersPage,
  ],
  imports: [
    IonicPageModule.forChild(TimersPage),
  ],
  exports: [
    TimersPage
  ]
})
export class TimersModule {}
