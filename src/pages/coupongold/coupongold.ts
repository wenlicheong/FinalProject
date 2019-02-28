import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import {QrcodePage} from '../qrcode/qrcode';
/**
 * Generated class for the CoupongoldPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-coupongold',
  templateUrl: 'coupongold.html',
})
export class CoupongoldPage {

  goldRef: any={};

  constructor(private fdb: AngularFireDatabase, private afAuth: AngularFireAuth,public navCtrl: NavController, public navParams: NavParams) {
    
    this.fdb.object('Gold/').valueChanges().subscribe(_data=>{
      this.goldRef=_data; 
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CoupongoldPage');
  }

  claimgoldcoupon(){
    this.afAuth.authState.take(1).subscribe(auth=>{    //identifying user
        this.fdb.object('UserCoupons/' + 'Gold/' + auth.uid).set(0);
        this.fdb.object('ClaimedCoupons/' + 'Gold/' + auth.uid).set(1);
      });  
      this.navCtrl.push(QrcodePage);  
  }

}
