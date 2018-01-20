import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HoursSelectorComponent } from './hours-selector';

@NgModule({
  declarations: [
    HoursSelectorComponent,
  ],
  imports: [
    IonicPageModule.forChild(HoursSelectorComponent),
  ],
  exports: [
    HoursSelectorComponent
  ]
})
export class HoursSelectorModule {}
