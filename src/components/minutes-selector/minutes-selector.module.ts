import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MinutesSelectorComponent } from './minutes-selector';

@NgModule({
  declarations: [
    MinutesSelectorComponent,
  ],
  imports: [
    IonicPageModule.forChild(MinutesSelectorComponent),
  ],
  exports: [
    MinutesSelectorComponent
  ]
})
export class MinutesSelectorModule {}
