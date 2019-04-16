import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-couponsilver',
  templateUrl: 'couponsilver.html',
})
export class CouponsilverPage {
  
  silverRef: any={};

  constructor(private alertCtrl: AlertController,private fdb: AngularFireDatabase, private afAuth: AngularFireAuth,public navCtrl: NavController, public navParams: NavParams) {
    
    this.fdb.object('Silver/').valueChanges().subscribe(_data=>{
      this.silverRef=_data; 
    }) 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CouponsilverPage');
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      message: 'Your coupon has been claimed',
      cssClass: 'alertdesign',
      buttons: [{
        text:'OK',
        cssClass:'alertbutton'}],
      
    });

    await alert.present();
    this.afAuth.authState.take(1).subscribe(auth=>{    //identifying user
      this.fdb.object('UserCoupons/' + 'Silver/' + auth.uid).set(0);        
      this.fdb.object('ClaimedCoupons/' + 'Silver/' + auth.uid).set(1);
    });    
  this.navCtrl.pop();
  }

}
