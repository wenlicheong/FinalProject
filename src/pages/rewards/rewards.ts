import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {BarcodeScanner, BarcodeScannerOptions} from '@ionic-native/barcode-scanner';
/**
 * Generated class for the RewardsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rewards',
  templateUrl: 'rewards.html',
})
export class RewardsPage {
  
  arrData=[]

  options: BarcodeScannerOptions;
  results:{};       /*barcode 1*/
  scanData : {};    /*barcode 2*/
  constructor(private barcode: BarcodeScanner, public navCtrl: NavController, public navParams: NavParams) {
   
  }
  /*barcode 1*/
  async scanBarcode(){
    this.options={
      prompt: 'Scann a barcode'
    }
    this.results = await this.barcode.scan(this.options);
    console.log(this.results);
  }
  /*barcode 2*/
  scan(){
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



  

}
