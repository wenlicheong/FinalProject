import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { AngularFireDatabase} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import {AngularFireList} from 'angularfire2/database/interfaces';
import { TotalPoints } from '../../models/totalpoints.interface';
import { Point } from '../../models/points';
import { Remaining } from '../../models/remaining';
import { UserCoupons } from '../../models/usercoupons';
import { InformationPage } from '../information/information';
import {Observable} from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-qrcode',
  templateUrl: 'qrcode.html',
})
export class QrcodePage {
  options: BarcodeScannerOptions;
  scannedData:any={};
  arrData=[];
  totalData: any={};
  value;
  ref: AngularFireList<any>;
  date;
  profileData: Observable<any>;
  transaction = {}
  totalPoints ={} as TotalPoints;
  coupons = {} as UserCoupons;
  point:any ={} as Point;
  update: Observable<any>;
  remaining:any={} as Remaining;
  remain: Observable<any>;
  
  constructor(public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams, public scanner:BarcodeScanner, private fdb: AngularFireDatabase,private afAuth: AngularFireAuth) {

  //taking total data and displaying
  this.afAuth.authState.take(1).subscribe(auth=>{    //identifying user
    
    this.profileData=this.fdb.object('profile/'+ auth.uid).valueChanges();  //getting profile data for name customisation
    this.update=this.fdb.object('TotalPoints/' + auth.uid).valueChanges(); //geting points from database
    this.remain=this.fdb.object('Remaining/' + auth.uid).valueChanges();
    this.ref= this.fdb.list('transactions/'+ auth.uid, ref=>ref.orderByChild(auth.uid)); 
      this.ref.valueChanges().subscribe(result=>{
      this.arrData=result;                           //subscribe passes the value and displays it in the console
      console.log(this.arrData);
      this.totalData=0;
            for (let index = 0; index < this.arrData.length; index++) {               //add values up
              this.totalData += parseInt(this.arrData[index].points,10);  
            }
      this.fdb.object('Point/'+ auth.uid).set(this.totalData);
      this.updatePoints(this.totalData);     //updates points below 100
     });   
  })
   
  }

  updatePoints(data){
    if (data>=300){
      this.point=data-300;
      this.remaining = 100 - this.point;
      this.afAuth.authState.take(1).subscribe(auth=>{
      this.fdb.object('TotalPoints/'+ auth.uid).set(this.point);
      this.fdb.object('Remaining/'+ auth.uid).set(this.remaining);
      })
    } else if (data>=200){
      this.point=data-200;
      this.remaining = 100 - this.point;
      this.afAuth.authState.take(1).subscribe(auth=>{
      this.fdb.object('TotalPoints/'+ auth.uid).set(this.point);
      this.fdb.object('Remaining/'+ auth.uid).set(this.remaining); 
      })
    } else if (data>=100){
      this.point=data-100;
      this.remaining = 100 - this.point;
      this.afAuth.authState.take(1).subscribe(auth=>{
      this.fdb.object('TotalPoints/'+ auth.uid).set(this.point);
      this.fdb.object('Remaining/'+ auth.uid).set(this.remaining); 
      })
    }   
    else{
    this.point=data;
    this.remaining = 100 - this.point;
    this.afAuth.authState.take(1).subscribe(auth=>{
      this.fdb.object('TotalPoints/'+ auth.uid).set(this.point);
      this.fdb.object('Remaining/'+ auth.uid).set(this.remaining);
    })
    }
    this.userCoupons();
  }

  moneySaved(){
    return 0.20*this.totalData;
  }

  turtlesSaved(){
    return 0.1*this.totalData;
  }

  scan(){

    this.fdb.object("Date/").valueChanges().subscribe(_data=>{
      this.date=_data;                       //subscribe passes the value and displays it in the console
    });

    this.options={
      prompt:'Scan your barcode'
    }; 

    this.scanner.scan(this.options).then((data) => {
      this.scannedData = data.text       //takes data and puts it into scanned data
      if (this.scannedData==this.date){
                this.afAuth.authState.take(1).subscribe(auth=>{    //identifying user
                  this.ref= this.fdb.list('transactions/'+ auth.uid, ref=>ref.orderByChild(auth.uid));
                      this.ref.push(this.transaction).then(()=>{
                        this.transaction={
                          points: 50
                        };
                      });  //pushing scanned data into specific user
          
                })
          }
          else{
            this.afAuth.authState.take(1).subscribe(auth=>{    //identifying user
              this.ref= this.fdb.list('transactions/'+ auth.uid, ref=>ref.orderByChild(auth.uid));
                  this.ref.push(this.transaction).then(()=>{
                    this.transaction={
                      points: 0
                    };
                  });  //pushing scanned data into specific user
      
            })
          
          }
          
    }, (err) => {
      console.log('Error:',err);
    })

   

  }

  rewardspage(){
    this.navCtrl.push('RewardsPage');
  }
  
  userCoupons(){
    this.afAuth.authState.take(1).subscribe(auth=>{    //identifying user
      this.fdb.object('Point/'+ auth.uid).valueChanges().subscribe(data=>{
        this.value=data;
        if (this.value==300) {
          this.fdb.object('UserCoupons/' + 'Gold/' + auth.uid).set(1);
        }
        else if (this.value==200){
          this.fdb.object('UserCoupons/' + 'Silver/' + auth.uid).set(1);
        }
        else if (this.value==100){
          this.fdb.object('UserCoupons/' + 'Bronze/' + auth.uid).set(1);
        }
      });  
    })    
  }
  
    navigatetoinformationpage(){
      this.modalCtrl.create(InformationPage).present();
    }
 
}


