import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TimerListItem } from './timer-list-item';
import * as components from "components";

@NgModule({
  declarations: [
    TimerListItem,
  ],
  imports: [
    IonicPageModule.forChild(TimerListItem),
      components.GaugeRadialModule,
  ],
  exports: [
    TimerListItem
  ]
})
export class TimerListItemModule {}
