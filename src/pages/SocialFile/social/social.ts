import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, IonicPage, Tabs } from 'ionic-angular';

/**
 * Generated class for the SocialPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-social',
  templateUrl: 'social.html',
})
export class SocialPage {
 @ViewChild('myTabs')tabRef: Tabs;
  
 tab1 = 'FeedPage';
 tab2 = 'PostPage';
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SocialPage');

  }

}
