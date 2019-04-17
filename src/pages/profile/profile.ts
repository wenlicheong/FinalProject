import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { AngularFireDatabase} from 'angularfire2/database';
import { AngularFireAuth } from "angularfire2/auth";
import {Observable} from 'rxjs/Observable';
import { LoginPage } from '../login/login';
import { OAuthService } from 'angular-oauth2-oidc';

@IonicPage()
@Component({
selector: 'page-profile',
templateUrl: 'profile.html',
})


export class ProfilePage {

    bronzeRef: any={};
    silverRef: any={};
    goldRef: any={};
    platinumRef: any={};
    bronze;
    silver;
    gold;
    platinum;
   
profileData: Observable<any>;
constructor(public app: App, public oauthService: OAuthService, private fdb: AngularFireDatabase, private afAuth:AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
  //just for getting voucher details 
    this.fdb.object('Bronze/').valueChanges().subscribe(_data=>{
        this.bronzeRef=_data; 
      }) 
      this.fdb.object('Silver/').valueChanges().subscribe(_data=>{
        this.silverRef=_data; 
      })
      this.fdb.object('Gold/').valueChanges().subscribe(_data=>{
        this.goldRef=_data; 
      })
      this.fdb.object('Platinum/').valueChanges().subscribe(_data=>{
        this.platinumRef=_data; 
      })
      this.getBronzeClaimCoupon();
      this.getSilverClaimCoupon();
      this.getGoldClaimCoupon();
      this.getPlatinumClaimCoupon();
}

ionViewDidLoad() {

this.afAuth.authState.take(1).subscribe(auth=>{
this.profileData=this.fdb.object('profile/'+ auth.uid).valueChanges();
})

}


getBronzeClaimCoupon(){
  this.afAuth.authState.take(1).subscribe(auth=>{    //identifying user
    this.fdb.object('ClaimedCoupons/'+ 'Bronze/' + auth.uid).valueChanges().subscribe(data=>{
      this.bronze=data
    });      
  })
}

getSilverClaimCoupon(){
  this.afAuth.authState.take(1).subscribe(auth=>{    //identifying user
    this.fdb.object('ClaimedCoupons/'+ 'Silver/' + auth.uid).valueChanges().subscribe(data=>{
      this.silver=data
    });      
  })
}

getGoldClaimCoupon(){
  this.afAuth.authState.take(1).subscribe(auth=>{    //identifying user
    this.fdb.object('ClaimedCoupons/'+ 'Gold/' + auth.uid).valueChanges().subscribe(data=>{
      this.gold=data
    });      
  })
}

getPlatinumClaimCoupon(){
  this.afAuth.authState.take(1).subscribe(auth=>{    //identifying user
    this.fdb.object('ClaimedCoupons/'+ 'Platinum/' + auth.uid).valueChanges().subscribe(data=>{
      this.platinum=data
    });      
  })
}

signout(){
  this.oauthService.logOut(true);
  this.app.getRootNavs()[0].setRoot(LoginPage);
}


}