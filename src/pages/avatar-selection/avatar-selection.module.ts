import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AvatarSelectionPage } from './avatar-selection';

@NgModule({
  declarations: [
    AvatarSelectionPage,
  ],
  imports: [
    IonicPageModule.forChild(AvatarSelectionPage),
  ],
})
export class AvatarSelectionModule {}
