import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Point } from "../../models/points";
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
  scannedData1:any={};
  points = {} as Point;
  numData;
  totalData;

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
