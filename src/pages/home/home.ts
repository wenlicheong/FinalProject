import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Nav) nav: Nav;
  pages: Array<{title:string, component: string,openTab? :any}>;
  rootPage='MainPage';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.pages=[
      { title: 'MainPage',component:'MainPage'},
    ];
  }

  openPage(page){
    this.nav.setRoot(page.component,{openTab:page.openTab});
  }
}
