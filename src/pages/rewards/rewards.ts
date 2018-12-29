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
  }

  ionViewDidLoad(){
   
  }

  //checking whether user has coupon
  getBronzeCoupon(){     
    this.afAuth.authState.take(1).subscribe(auth=>{    //identifying user
      this.fdb.object('UserCoupons/'+ 'Bronze/' + auth.uid).valueChanges().subscribe(data=>{
        this.value=data
      });      
    })
  }

  getSilverCoupon(){     
    this.afAuth.authState.take(1).subscribe(auth=>{    //identifying user
      this.fdb.object('UserCoupons/'+ 'Silver/' + auth.uid).valueChanges().subscribe(data=>{
        this.value=data;
        if (this.value==1){
          return true;
        }
        else return false;
      });      
    })
  }

  getGoldCoupon(){     
    this.afAuth.authState.take(1).subscribe(auth=>{    //identifying user
      this.fdb.object('UserCoupons/'+ 'Gold/' + auth.uid).valueChanges().subscribe(data=>{
        this.value=data;
        if (this.value==1){
          return true;
        }
        else return false;
      });      
    })
  }

  //when user has claimed coupon
  claimcoupon(){
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
