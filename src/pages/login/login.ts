import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, ToastController } from 'ionic-angular';
import { User } from "../../models/user";
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage({name:'LoginPage'})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user={} as User;
  constructor(private afAuth: AngularFireAuth, private toast: ToastController, public navCtrl: NavController, public navParams: NavParams) {
  
  }

 async login(user:User){
   try{
     const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
     if(result){
        this.afAuth.authState.subscribe(data=>{
          if (data && data.email && data.uid) {
            this.toast.create({
              message:'Welcome',
              duration:3000
            }).present();
            this.navCtrl.setRoot('MainPage');
          }
          
        });
     }
    
    }
   catch(e){
     console.error(e);
   } 
  }

 register(){
   this.navCtrl.push('RegisterPage');  //go to register page
 }

}
