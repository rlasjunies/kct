import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TimersPage } from './timers.page';
import * as components from 'components';

@NgModule({
  declarations: [
    TimersPage,
  ],
  imports: [
    IonicPageModule.forChild(TimersPage),
    components.TimerListCardModule
  ],
  exports: [
    TimersPage
  ]
})
export class TimersModule {}
