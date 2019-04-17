/*parent module */
import { BrowserModule } from '@angular/platform-browser';   /*browser compatible*/
import { ErrorHandler, NgModule } from '@angular/core';      
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFireDatabaseModule} from 'angularfire2/database';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
/*references of libraries that have to be imported before it is used*/
import { HttpClientModule } from '@angular/common/http';
import { OAuthModule } from 'angular-oauth2-oidc';

import { MyApp } from './app.component';
import {FIREBASE_CONFIG} from "./app.firebase.config";
import { CouponPage } from '../pages/coupon/coupon';
import { CouponsilverPage } from '../pages/couponsilver/couponsilver';
import { CoupongoldPage } from '../pages/coupongold/coupongold';
import { InformationPage } from '../pages/information/information';
 
@NgModule({
  declarations: [
    MyApp,   /*parent component*/
    CouponPage,
    CouponsilverPage,
    CoupongoldPage,
    InformationPage
    
  ],
  imports: [      /*import all the libraries refeerred above*/
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    HttpClientModule,
    OAuthModule.forRoot()

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CouponPage,
    CouponsilverPage, 
    CoupongoldPage,
    InformationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
