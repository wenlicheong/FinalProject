import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewprofilePage } from './newprofile';

@NgModule({
  declarations: [
    NewprofilePage,
  ],
  imports: [
    IonicPageModule.forChild(NewprofilePage),
  ],
})
export class NewprofilePageModule {}
