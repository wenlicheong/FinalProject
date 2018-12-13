/*parent module */
import { BrowserModule } from '@angular/platform-browser';   /*browser compatible*/
import { ErrorHandler, NgModule } from '@angular/core';      
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

/*references of libraries that have to be imported before it is used*/

import { MyApp } from './app.component';
import {FIREBASE_CONFIG} from "./app.firebase.config";



@NgModule({
  declarations: [
    MyApp,   /*parent component*/
    
  ],
  imports: [      /*import all the libraries refeerred above*/
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFireDatabaseModule
    

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
   
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
