import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs } from 'ionic-angular';


/**
 * Generated class for the MainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {
  tab1 = 'QrcodePage';
  tab2 = 'RewardsPage';
  tab3 = 'ProfilePage';
  tab4= 'ScanPage';

  @ViewChild('myTabs') tabRef: Tabs;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    let openTab=this.navParams.get('openTab');
    if (openTab){
      this.tabRef.select(openTab);
    }
  }

}
