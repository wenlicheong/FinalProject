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