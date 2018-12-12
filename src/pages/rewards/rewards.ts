import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import {BarcodeScanner} from '@ionic-native/barcode-scanner';
import {Observable} from 'rxjs/Observable';
import {AngularFireList} from 'angularfire2/database/interfaces';
import {AngularFireDatabase} from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-rewards',
  templateUrl: 'rewards.html',
})
export class RewardsPage {

  constructor(private fdb: AngularFireDatabase, private barcode: BarcodeScanner, public navCtrl: NavController, public navParams: NavParams, private toast: ToastController) {
  }

  ionViewDidLoad(){
   
  }
 

}
