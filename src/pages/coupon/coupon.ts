import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireDatabase} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the CouponPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-coupon',
  templateUrl: 'coupon.html',
})
export class CouponPage {

  bronzeRef: any={};
  
  constructor(private fdb: AngularFireDatabase, private afAuth: AngularFireAuth,public navCtrl: NavController, public navParams: NavParams) {
 
    this.fdb.object('Bronze/').valueChanges().subscribe(_data=>{
      this.bronzeRef=_data; 
    }) 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CouponPage');
  }

   //when user has claimed coupon
   claimbronzecoupon(){
    this.afAuth.authState.take(1).subscribe(auth=>{    //identifying user
        this.fdb.object('UserCoupons/' + 'Bronze/' + auth.uid).set(0);
      });    
  }

  claimsilvercoupon(){
    this.afAuth.authState.take(1).subscribe(auth=>{    //identifying user
        this.fdb.object('UserCoupons/' + 'Silver/' + auth.uid).set(0);
      });    
  }

  claimgoldcoupon(){
    this.afAuth.authState.take(1).subscribe(auth=>{    //identifying user
        this.fdb.object('UserCoupons/' + 'Gold/' + auth.uid).set(0);
      });    
  }

}
