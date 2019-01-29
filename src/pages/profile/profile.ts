import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase} from 'angularfire2/database';
import { Profile } from '../../models/profile';
import { AngularFireAuth } from "angularfire2/auth";
import {Observable} from 'rxjs/Observable';
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  profileData: Observable<any>;  

  constructor(private fdb: AngularFireDatabase, private afAuth:AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.afAuth.authState.take(1).subscribe(auth=>{
      this.profileData=this.fdb.object('profile/'+ auth.uid).valueChanges();
    
    })
  }

  isReadonly(){
    return this.isReadonly;
  }

}
