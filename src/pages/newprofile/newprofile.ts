import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/auth";
import { Profile } from '../../models/profile';
import { AngularFireDatabase} from 'angularfire2/database';
import { LoginPage } from '../login/login';

/**
 * Generated class for the NewprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-newprofile',
  templateUrl: 'newprofile.html',
})
export class NewprofilePage {

  profile={} as Profile;

  constructor(private fdb: AngularFireDatabase, private afAuth:AngularFireAuth,public navCtrl: NavController, public navParams: NavParams) {
  }

  createProfile(){
    this.afAuth.authState.take(1).subscribe(auth=>{
      this.fdb.database
      .ref('/profile')
      .child(auth.uid).set(this.profile)
      .then(()=>this.navCtrl.setRoot(LoginPage));
    })
  }

}