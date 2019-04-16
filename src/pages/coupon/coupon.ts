import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import {QrcodePage} from '../qrcode/qrcode';
import {RewardsPage} from '../rewards/rewards';
import {MainPage} from '../main/main';
import { AlertController } from 'ionic-angular';
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
  silverRef: any={};
  goldRef: any={};

  constructor(private alertCtrl: AlertController, private fdb: AngularFireDatabase, private afAuth: AngularFireAuth,public navCtrl: NavController, public navParams: NavParams) {
 
    this.fdb.object('Bronze/').valueChanges().subscribe(_data=>{
      this.bronzeRef=_data; 
    }) 
  }

  ionViewDidLoad() {
  }

   //when user has claimed coupon
/*   claimbronzecoupon(){
    this.afAuth.authState.take(1).subscribe(auth=>{    //identifying user
        this.fdb.object('UserCoupons/' + 'Bronze/' + auth.uid).set(0);        
        this.fdb.object('ClaimedCoupons/' + 'Bronze/' + auth.uid).set(1);
      });    
    //this.navCtrl.push(QrcodePage);
    this.navCtrl.parent.parent.popToRoot(QrcodePage);

  }
*/

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      title: 'Alert',
      message: 'Your coupon has been claimed',
      buttons: ['OK']
    });

    await alert.present();
    this.afAuth.authState.take(1).subscribe(auth=>{    //identifying user
      this.fdb.object('UserCoupons/' + 'Bronze/' + auth.uid).set(0);        
      this.fdb.object('ClaimedCoupons/' + 'Bronze/' + auth.uid).set(1);
    });    
  //this.navCtrl.push(QrcodePage);
  this.navCtrl.pop();
  }


  

 

}
