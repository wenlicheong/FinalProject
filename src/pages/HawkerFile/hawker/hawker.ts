import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams, IonicPage, Tabs } from 'ionic-angular';

/**
 * Generated class for the HawkerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-hawker',
  templateUrl: 'hawker.html',
})
export class HawkerPage {
  @ViewChild('myTabs')tabRef: Tabs;
  
  tab1 ='FoodPage';
  tab2='DrinksPage';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    let openTab = this.navParams.get('openTab');
    if(openTab){
      this.tabRef.select(openTab);
    }
  }

}
