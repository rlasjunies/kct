import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TimersConfigPage } from './timers-config';

@NgModule({
  declarations: [
    TimersConfigPage,
  ],
  imports: [
    IonicPageModule.forChild(TimersConfigPage),
  ],
  exports: [
    TimersConfigPage
  ]
})
export class TimersConfigModule {}
