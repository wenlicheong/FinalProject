import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import {AngularFireDatabase} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-rewards',
  templateUrl: 'rewards.html',
})
export class RewardsPage {
 
 bronzeRef: any={};
 silverRef: any={};
 goldRef: any={};
 value;
 bronze;
 silver;
 gold;

  constructor(private fdb: AngularFireDatabase, private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
    //getting voucher details from database
    this.fdb.object('Bronze/').valueChanges().subscribe(_data=>{
      this.bronzeRef=_data; 
    }) 
    this.fdb.object('Silver/').valueChanges().subscribe(_data=>{
      this.silverRef=_data; 
    })
    this.fdb.object('Gold/').valueChanges().subscribe(_data=>{
      this.goldRef=_data; 
    })

    this.getBronzeCoupon();
    this.getGoldCoupon();
    this.getSilverCoupon();
  }

  ionViewDidLoad(){
   
  }

  //checking whether user has coupon
  getBronzeCoupon(){     
    this.afAuth.authState.take(1).subscribe(auth=>{    //identifying user
      this.fdb.object('UserCoupons/'+ 'Bronze/' + auth.uid).valueChanges().subscribe(data=>{
        this.bronze=data
      });      
    })
  }

  getSilverCoupon(){     
    this.afAuth.authState.take(1).subscribe(auth=>{    //identifying user
      this.fdb.object('UserCoupons/'+ 'Silver/' + auth.uid).valueChanges().subscribe(data=>{
        this.silver=data
      });      
    })
  }

  getGoldCoupon(){     
    this.afAuth.authState.take(1).subscribe(auth=>{    //identifying user
      this.fdb.object('UserCoupons/'+ 'Gold/' + auth.uid).valueChanges().subscribe(data=>{
        this.gold=data
      });      
    })
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


/*
  displaycoupon(){
    this.afAuth.authState.take(1).subscribe(auth=>{    //identifying user
      this.fdb.object('TotalPoints/'+ auth.uid).valueChanges().subscribe(data=>{
        this.value=data;
        
    if (this.value >=100 ){
      this.fdb.object('Bronze/').valueChanges().subscribe(_data=>{
        this.bronzeRef=_data; 
      })
    }

      });      
    })
  }
*/

}
