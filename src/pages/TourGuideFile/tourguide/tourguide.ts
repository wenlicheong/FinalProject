import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, IonicPage, Tabs } from 'ionic-angular';

/**
 * Generated class for the TourguidePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-tourguide',
  templateUrl: 'tourguide.html',
})
export class TourguidePage {
  @ViewChild('myTabs')tabRef: Tabs;

  tab1 = 'ListingPage';
  tab2 = 'AcceptancePage'; 

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TourguidePage');
  }

}
