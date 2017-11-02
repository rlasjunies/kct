import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, ViewController, NavParams } from 'ionic-angular';
/**
 * Generated class for the AvatarSelection page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */ 
export const ID_avatarSelection = "avatar-selection";
@IonicPage({
    name: "avatar-selection",
    segment: "avatar-selection"
})
@Component({
  selector: 'page-avatar-selection',
  templateUrl: 'avatar-selection.html',
})
export class AvatarSelection {
    public icons: string[] = [
        "game-controller-b",
        "game-controller-a",
        "film",
        "laptop",
        "headset",
        "help",
        "images",
        "jet",
        "mic",
        "notifications",
        "notifications-off",
        "phone-landscape",
        "phone-portrait",
        "tablet-landscape",
        "tablet-portrait",
        "tux",
        "pint",
        "call",
        "school",
        "football",
        "happy",
        "heart",
    ]

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController
    ) { }

  ionViewDidLoad() {
      let id: string | number = this.navParams.get('id');
  }

  iconSelected(iconName: string){
      console.log("icon selected:", iconName);
      this.viewCtrl.dismiss(iconName);      
  } 

}
