import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import {BarcodeScanner} from '@ionic-native/barcode-scanner';
import {Observable} from 'rxjs/Observable';
import {AngularFireList} from 'angularfire2/database/interfaces';
import {AngularFireDatabase} from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-rewards',
  templateUrl: 'rewards.html',
})
export class RewardsPage {
  
 // arrData=[]

  //options: BarcodeScannerOptions;
  //results:{};       /*barcode 1*/
  //scanData : {};    /*barcode 2*/

  data: Observable <any[]>;
  ref: AngularFireList<any>;
  
  months = [
    {value:0, name:'January'},
    {value:1, name:'February'},
  ];

  transaction = {
    value:0,
    expense:false,
    month:0
  }

  @ViewChild('valueBarsCanvas')valueBarCanvas;
  valueBarsChart: any;
  chartData= null;

  constructor(private fdb: AngularFireDatabase, private barcode: BarcodeScanner, public navCtrl: NavController, public navParams: NavParams, private toast: ToastController) {
  }

  /*barcode 1*/
/*  async scanBarcode(){
    this.options={
      prompt: 'Scann a barcode'
    }
    this.results = await this.barcode.scan(this.options);
    console.log(this.results);
  } */
  /*barcode 2*/
/*  scan(){
    this.options = {
      prompt : "Scan your barcode"
    }
    this.barcode.scan(this.options).then((barcodeData)=>{
      console.log(barcodeData);
      this.scanData=barcodeData;
    }, (err)=>{
      console.log("Error ocurred: " + err);
    }
    );

    
  }
*/
  ionViewDidLoad(){
    this.ref= this.fdb.list('transactions', ref=>ref.orderByChild('month'));

    this.ref.valueChanges().subscribe(result=>{
      if(this.chartData){
        this.updateCharts(result);
      }else{
        this.createCharts(result);
      }
    });
  }

  addTransaction(){
    this.ref.push(this.transaction).then(()=>{
      this.transaction={
        value:0,
        expense:false,
        month:0
      };
      
    });
  }

  createCharts(data){

  }

  updateCharts(data){

  }
  

}
