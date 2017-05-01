import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Credits } from './credits';

@NgModule({
  declarations: [
    Credits,
  ],
  imports: [
    IonicPageModule.forChild(Credits),
  ],
  exports: [
    Credits
  ]
})
export class CreditsModule {}
