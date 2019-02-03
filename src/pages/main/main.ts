import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {
  tab1 = 'QrcodePage';
  tab2 = 'ProfilePage';
  

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
