import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase} from 'angularfire2/database';
import { AngularFireAuth } from "angularfire2/auth";
import {Observable} from 'rxjs/Observable';

@IonicPage()
@Component({
selector: 'page-profile',
templateUrl: 'profile.html',
})


export class ProfilePage {

    bronzeRef: any={};
    silverRef: any={};
    goldRef: any={};
    bronze;
    silver;
    gold;
   
profileData: Observable<any>;
constructor(private fdb: AngularFireDatabase, private afAuth:AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
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
      this.getBronzeClaimCoupon();
      this.getSilverClaimCoupon();
      this.getGoldClaimCoupon();
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


}