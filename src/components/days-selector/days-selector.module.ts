import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DaysSelectorComponent } from './days-selector';

@NgModule({
  declarations: [
    DaysSelectorComponent,
  ],
  imports: [
    IonicPageModule.forChild(DaysSelectorComponent),
  ],
  exports: [
    DaysSelectorComponent,

  ],
  providers: [
  ]
})
export class DaysSelectorModule {}
