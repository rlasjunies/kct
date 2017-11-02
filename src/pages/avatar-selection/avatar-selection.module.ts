import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AvatarSelection } from './avatar-selection';

@NgModule({
  declarations: [
    AvatarSelection,
  ],
  imports: [
    IonicPageModule.forChild(AvatarSelection),
  ],
})
export class AvatarSelectionModule {}
