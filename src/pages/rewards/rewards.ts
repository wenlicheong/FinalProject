import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import {AngularFireDatabase} from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-rewards',
  templateUrl: 'rewards.html',
})
export class RewardsPage {

 awardRef: any={};

  constructor(private fdb: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
    
     this.fdb.object('Bronze/').valueChanges().subscribe(_data=>{
      this.awardRef=_data; 
    })
  }

  ionViewDidLoad(){
   
  }

}
