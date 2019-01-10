import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions} from '@ionic-native/barcode-scanner';
import { AngularFireDatabase} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import {AngularFireList} from 'angularfire2/database/interfaces';

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
  date;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public scanner:BarcodeScanner,private fdb: AngularFireDatabase,private afAuth: AngularFireAuth) {
    
    this.fdb.object("Date/").valueChanges().subscribe(_data=>{
      this.date=_data;                           //subscribe passes the value and displays it in the console

    });
  
  } 

  scan(){

    this.options={
      prompt:'Scan your barcode'
    }; 

    this.scanner.scan(this.options).then((data) => {
      this.scannedData = data;        //takes data and puts it into scanned data
          if (this.scannedData==this.date){
                this.afAuth.authState.take(1).subscribe(auth=>{    //identifying user
                  this.ref= this.fdb.list('transactions/'+ auth.uid, ref=>ref.orderByChild(auth.uid));
                      this.ref.push(this.transaction).then(()=>{
                        this.transaction={
                          points: 5
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


 
  
}
