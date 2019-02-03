import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QrcodePage } from './qrcode';
//import { PogressBarComponent } from '../../components/pogress-bar/pogress-bar';
//import { CircleBarComponent } from '../../components/circle-bar/circle-bar';

@NgModule({
  declarations: [
    QrcodePage
   // PogressBarComponent,
    //CircleBarComponent
  ],
  imports: [
    IonicPageModule.forChild(QrcodePage),
  ],
})
export class QrcodePageModule {}
