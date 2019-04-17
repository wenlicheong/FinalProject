import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-couponplatinum',
  templateUrl: 'couponplatinum.html',
})
export class CouponplatinumPage {

  bronzeRef: any={};
  silverRef: any={};
  goldRef: any={};
  platinumRef: any={};

  constructor(private alertCtrl: AlertController, private fdb: AngularFireDatabase, private afAuth: AngularFireAuth,public navCtrl: NavController, public navParams: NavParams) {
 
    this.fdb.object('Platinum/').valueChanges().subscribe(_data=>{
      this.platinumRef=_data; 
    }) 
  }

  ionViewDidLoad() {
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      message: 'Your coupon has been claimed',
      buttons: ['Got it!']
      
    });

    await alert.present();
    this.afAuth.authState.take(1).subscribe(auth=>{    //identifying user
      this.fdb.object('UserCoupons/' + 'Platinum/' + auth.uid).set(0);        
      this.fdb.object('ClaimedCoupons/' + 'Platinum/' + auth.uid).set(1);
    });    
  this.navCtrl.pop();
  }


  

 

}
