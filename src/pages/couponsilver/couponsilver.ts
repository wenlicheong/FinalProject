import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

/**
/**
 * Generated class for the CouponsilverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-couponsilver',
  templateUrl: 'couponsilver.html',
})
export class CouponsilverPage {
  
  silverRef: any={};

  constructor(private fdb: AngularFireDatabase, private afAuth: AngularFireAuth,public navCtrl: NavController, public navParams: NavParams) {
    
    this.fdb.object('Silver/').valueChanges().subscribe(_data=>{
      this.silverRef=_data; 
    }) 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CouponsilverPage');
  }

  claimsilvercoupon(){
    this.afAuth.authState.take(1).subscribe(auth=>{    //identifying user
        this.fdb.object('UserCoupons/' + 'Silver/' + auth.uid).set(0);
      });    
  }
}
