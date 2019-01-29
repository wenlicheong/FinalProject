import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { AngularFireDatabase} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Point } from "../../models/points";
import {AngularFireList} from 'angularfire2/database/interfaces';
import {Chart} from 'chart.js';
import { TotalPoints } from '../../models/totalpoints.interface';
import { UserCoupons } from '../../models/usercoupons';
import { InformationPage } from '../information/information';
import { Slides } from 'ionic-angular';
import { Observable } from 'rxjs';

/**
 * Generated class for the QrcodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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

  transaction = {
  }

  totalPoints ={} as TotalPoints;
  coupons = {} as UserCoupons;

  @ViewChild('valueBarsCanvas')valueBarsCanvas;
  valueBarsChart: any;
  chartData= null;

  constructor(public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams, public scanner:BarcodeScanner, private fdb: AngularFireDatabase,private afAuth: AngularFireAuth) {

    //displaying coupons
    this.fdb.list("/AvailCoupons/").valueChanges().subscribe(_data=>{
      this.availcoupons=_data;                           //subscribe passes the value and displays it in the console

    });
   
  //taking total data and displaying
  this.afAuth.authState.take(1).subscribe(auth=>{    //identifying user
    this.ref= this.fdb.list('transactions/'+ auth.uid, ref=>ref.orderByChild(auth.uid));
      this.ref.valueChanges().subscribe(result=>{
      this.arrData=result;                           //subscribe passes the value and displays it in the console
      console.log(this.arrData);
      this.totalData=0;
            for (let index = 0; index < this.arrData.length; index++) {               //add values up
              this.totalData += parseInt(this.arrData[index].points,10);  
            }
      this.createChart(this.totalData);
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad QrcodePage');
  }

  createChart(data){
   if (data>=100) {
     this.createsilverChart(data);
   }
   else{
  this.chartData=data;
  this.capData= 100;
  this.valueBarsChart = new Chart(this.valueBarsCanvas.nativeElement, {
    type: 'doughnut',
    data: {
        labels: ["Current", "Bronze"],
        datasets: [{
            label: 'Recycling Journey',
            data: [this.chartData, this.capData-this.chartData],
            backgroundColor: [
                'rgba(60, 179, 113)',
                'rgba(143, 188, 143)'               
            ],
        /*  borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'              
            ], */
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            
        }, 
        cutoutPercentage:70

        
    }
  });

  }
}

  createsilverChart(data){
    if (data>=200){
      this.creategoldChart(data);
    }
    else{
    this.chartData=data;
    this.capData= 100;
    this.valueBarsChart = new Chart(this.valueBarsCanvas.nativeElement, {
      type: 'doughnut',
      data: {
          labels: ["Current", "Silver"],
          datasets: [{
              label: 'Recycling Journey',
              data: [this.chartData, this.capData-this.chartData],
              backgroundColor: [
                'rgba(60, 179, 113)',
                'rgba(143, 188, 143)'                 
              ],
           /*   borderColor: [
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)'              
              ],*/
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              
          }, 
          cutoutPercentage:70
  
      }
    });
  
    }
  }

  creategoldChart(data){
    this.chartData=data;
    this.capData= 100;
    this.valueBarsChart = new Chart(this.valueBarsCanvas.nativeElement, {
      type: 'doughnut',
      data: {
          labels: ["Current", "Gold"],
          datasets: [{
              label: 'Recycling Journey',
              data: [this.chartData, this.capData-this.chartData],
              backgroundColor: [
                'rgba(60, 179, 113)',
                'rgba(143, 188, 143)'               
              ],
          /*    borderColor: [
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)'              
              ], */
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              
          }, 
          cutoutPercentage:70
  
      }
    });
  
    }


    tosilver(){
      this.afAuth.authState.take(1).subscribe(auth=>{    //identifying user
        this.fdb.object('TotalPoints/'+ auth.uid).valueChanges().subscribe(data=>{
          this.value=data;
          if (this.value>=200) {
            this.togold();
          }
        });  
      })    
      return this.silvertier - this.value;
    }

    togold(){
      this.afAuth.authState.take(1).subscribe(auth=>{    //identifying user
        this.fdb.object('TotalPoints/'+ auth.uid).valueChanges().subscribe(data=>{
          this.value=data;
        });  
      })    
      return this.goldtier - this.value;
    }

    navigatetoinformationpage(){
      this.modalCtrl.create(InformationPage).present();
    }

}


