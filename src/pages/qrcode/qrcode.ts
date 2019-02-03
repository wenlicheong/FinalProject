import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { AngularFireDatabase} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Point } from "../../models/points";
import {AngularFireList} from 'angularfire2/database/interfaces';
//import {Chart} from 'chart.js';
import { TotalPoints } from '../../models/totalpoints.interface';
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
  points = {} as Point;
  numData;
  totalData: any={};
  capData;
  loadProgress=50;
  value;
  ref: AngularFireList<any>;
  goldtier=300;
  silvertier=300;
  availcoupons=[];

  date;
  profileData: Observable<any>;

  transaction = {
  }

  totalPoints ={} as TotalPoints;
  coupons = {} as UserCoupons;

  @ViewChild('valueBarsCanvas')valueBarsCanvas;
  valueBarsChart: any;
  chartData= null;

  constructor(public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams, public scanner:BarcodeScanner, private fdb: AngularFireDatabase,private afAuth: AngularFireAuth) {
/*
    //displaying coupons
    this.fdb.list("/AvailCoupons/").valueChanges().subscribe(_data=>{
      this.availcoupons=_data;                           //subscribe passes the value and displays it in the console

    });
*/   

  //taking total data and displaying
  this.afAuth.authState.take(1).subscribe(auth=>{    //identifying user

    //getting profile data for name customisation
    this.profileData=this.fdb.object('profile/'+ auth.uid).valueChanges();
      

    this.ref= this.fdb.list('transactions/'+ auth.uid, ref=>ref.orderByChild(auth.uid));
      this.ref.valueChanges().subscribe(result=>{
      this.arrData=result;                           //subscribe passes the value and displays it in the console
      console.log(this.arrData);
      this.totalData=0;
            for (let index = 0; index < this.arrData.length; index++) {               //add values up
              this.totalData += parseInt(this.arrData[index].points,10);  
            }
      this.insertPoints(this.totalData);
     });
      
  })
  this.userCoupons(); 
  }

  insertPoints(data){
    this.totalPoints=data;
    this.afAuth.authState.take(1).subscribe(auth=>{
      this.fdb.object('TotalPoints/'+ auth.uid).set(this.totalPoints);
        
    })
  }

  remainingPoints(){
    return 100 - this.totalData;
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
                          points: 10
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
      this.fdb.object('TotalPoints/'+ auth.uid).valueChanges().subscribe(data=>{
        this.value=data;
        if (this.value>=300) {
          this.fdb.object('UserCoupons/' + 'Gold/' + auth.uid).set(1);
        }
        else if (this.value>=200){
          this.fdb.object('UserCoupons/' + 'Silver/' + auth.uid).set(1);
        }
        else if (this.value>=100){
          this.fdb.object('UserCoupons/' + 'Bronze/' + auth.uid).set(1);
        }
      });  
    })    
  }
  
    navigatetoinformationpage(){
      this.modalCtrl.create(InformationPage).present();
    }
 
}


