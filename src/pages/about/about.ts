import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

export const ID_about = 'about';
@IonicPage({
    name: 'about',
    segment: 'about'
})
@Component({
    selector: 'page-about',
    templateUrl: 'about.html',
})
export class AboutPage {

    public devMode: boolean;


    constructor(public navCtrl: NavController, public navParams: NavParams) {}

    ionViewDidLoad() {
        // console.log('ionViewDidLoad AboutPage');
    }
}
