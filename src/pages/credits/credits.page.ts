import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

export const ID_credits = 'credits';
@IonicPage({
    name: 'credits',
    segment: 'credits'
})
@Component({
  selector: 'page-credits',
  templateUrl: 'credits.page.html',
})
export class Credits {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Credits');
  }

}
