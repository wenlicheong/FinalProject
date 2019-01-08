import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions} from '@ionic-native/barcode-scanner';
import { AngularFireDatabase} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import {AngularFireList} from 'angularfire2/database/interfaces';
import { QrcodePage } from '../qrcode/qrcode';

/**
 * Generated class for the ScanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-scan',
  templateUrl: 'scan.html',
})
export class ScanPage {

  options: BarcodeScannerOptions;
  scannedData:any={};
  transaction = {};
  ref: AngularFireList<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public scanner:BarcodeScanner,private fdb: AngularFireDatabase,private afAuth: AngularFireAuth) {
    
    
  
  } 

  scan(){

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
   
        })
    }, (err) => {
      console.log('Error:',err);
    })

  }


 
  
}
