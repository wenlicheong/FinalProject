import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Point } from "../../models/points";
import {AngularFireList} from 'angularfire2/database/interfaces';
import {Observable} from 'rxjs/Observable';
import {Chart} from 'chart.js';

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

  ref: AngularFireList<any>;
  transaction = {
    points:0
  }

  @ViewChild('valueBarsCanvas')valueBarsCanvas;
  valueBarsChart: any;
  chartData= null;

  constructor(public navCtrl: NavController, public navParams: NavParams, public scanner:BarcodeScanner, private fdb: AngularFireDatabase,private afAuth: AngularFireAuth) {
   /* this.fdb.list("/myItems/").valueChanges().subscribe(_data=>{
      this.arrData=_data;                           //subscribe passes the value and displays it in the console
      console.log(this.arrData);
    });
   */    
  }
 
  scan(){
    this.options={
      prompt:'Scan your barcode'
    }; 

    this.scanner.scan(this.options).then((data) => {
      this.scannedData = data;        //takes data and puts it into scanned data
      // this.fdb.list("/myItems/").push(this.scannedData) ; //pushes scanned data into database
        this.afAuth.authState.take(1).subscribe(auth=>{    //identifying user
          this.fdb.list('points/'+ auth.uid).push(this.scannedData.text);  //pushing scanned data into specific user
             //this.numData = parseInt(this.scannedData.text,10); 
              //this.totalData+=this.numData;
            this.fdb.list('points/'+ auth.uid).valueChanges().subscribe(_data=>{
              this.arrData=_data;                           //subscribe passes the value and displays it in the console
              
              //console.log(this.arrData);

              this.totalData=0;
              for (let index = 1; index < this.arrData.length; index++) {               
                this.totalData += parseInt(this.arrData[index],10);  
              }
              //this.numData = parseInt(this.scannedData.text,10); 
              //this.totalData+=this.numData;
              //console.log(this.numData);
             });

            

        })
    }, (err) => {
      console.log('Error:',err);
    })
      
  }

  hello(){

    this.options={
      prompt:'Scan your barcode'
    }; 

    this.scanner.scan(this.options).then((data) => {
      this.scannedData = data;        //takes data and puts it into scanned data
     
        this.afAuth.authState.take(1).subscribe(auth=>{    //identifying user
          this.ref= this.fdb.list('transactions/'+ auth.uid, ref=>ref.orderByChild(auth.uid));
          this.ref.push(this.transaction).then(()=>{
            this.transaction={
              points: this.scannedData.text
            };
          });  //pushing scanned data into specific user
           /* 
            this.fdb.list('points/'+ auth.uid).valueChanges().subscribe(_data=>{
              this.arrData=_data;                           //subscribe passes the value and displays it in the console
              
            

              this.totalData=0;
              for (let index = 1; index < this.arrData.length; index++) {               
                this.totalData += parseInt(this.arrData[index],10);  
              }
             
             });

            */

        })
    }, (err) => {
      console.log('Error:',err);
    })

  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad QrcodePage');

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
       });

       
    })
  

   

  }
/*
  createCharts(data){
    this.chartData = data;

    let chartData = this.getValues();

    console.log('my array: ', chartData);

    this.valueBarsChart= new Chart(this.valueBarCanvas.nativeElement, {
     type: 'doughnut', 
     data:{
       labels: ["Points", "Pointstogo"],
       data: [50,50],
       datasets:

     }
    });
  }
*/

  createChart(data){
  this.chartData=data;
  this.capData= 1000;
  this.valueBarsChart = new Chart(this.valueBarsCanvas.nativeElement, {
    type: 'doughnut',
    data: {
        labels: ["Current", "Bronze"],
        datasets: [{
            label: 'Recycling Journey',
            data: [this.chartData, this.capData-this.chartData],
            backgroundColor: [
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)'               
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'              
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            
        }
    }
});

}



}


