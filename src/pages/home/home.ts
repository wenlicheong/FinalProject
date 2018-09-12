import { Component, ViewChild } from '@angular/core';
import { Nav, NavController, NavParams, ToastController, IonicPage } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  @ViewChild(Nav)nav: Nav;
  pages:Array<{title:string, component:string, openTab?:any}>;
  rootPage = 'HawkerPage';

  constructor(private afAuth: AngularFireAuth, private toast: ToastController,
    public navCtrl: NavController, public navParams: NavParams) {
      this.pages=[
        {title:'Hawker', component:'HawkerPage'},
        {title:'Social', component: 'SocialPage'},
        {title:'Tourguide', component: 'TourguidePage'},
        {title:'Chat', component: 'ChatPage'},
        {title:'Profile', component: 'ProfilePage'}
      ];
  }

  openPage(page){
    this.nav.setRoot(page.component, {openTab: page.openTab});
  }

  ionViewWillLoad() {
    this.afAuth.authState.subscribe(data => {
      if (data && data.email && data.uid){
      this.toast.create({
        message: 'Welcome to APP_NAME,${data.email}',
        duration:3000
      }).present();
    }
    else{
      this.toast.create({
        message:'Could not find authentication details',
        duration:3000
      }).present();
    }
      
   })
  }
}  
