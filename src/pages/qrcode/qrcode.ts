import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { AngularFireDatabase } from 'angularfire2/database';
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
  encodText:string ='';
  encodedData:any={};
  scannedData:any={};
  arrData=[];
  scannedData1:any={};
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public scanner:BarcodeScanner, private fdb: AngularFireDatabase ) {
    this.fdb.list("/myItems/").valueChanges().subscribe(_data=>{
      this.arrData=_data;                           //subscribe passes the value and displays it in the console
      console.log(this.arrData);
    });

    
  }

  
  scan(){
    this.options={
      prompt:'Scan your barcode'
    };

    
    this.scanner.scan(this.options).then((data) => {
      this.scannedData = data;        //takes data and puts it into scanned data
      this.fdb.list("/myItems/").push(this.scannedData)  //pushes scanned data into database
    }, (err) => {
      console.log('Error:',err);
    })
   
  }
  
  encode(){
    this.scanner.encode(this.scanner.Encode.TEXT_TYPE,this.encodText).then((data) => {
      this.encodedData =data; 
    }, (err) => {
        console.log('Error:',err); 
    })
   
  }

  hello(){

    this.options={
      prompt:'Scan your barcode'
    };

    this.scanner.scan(this.options).then((data) => {
      this.scannedData1 = data;        //takes data and puts it into scanned data
      this.fdb.list("/testing/").update(this.scannedData1,{text:this.scannedData1})  //pushes scanned data into database
    }, 
    (err) => {
      console.log('Error:',err);
    })

  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad QrcodePage');
  }

}
