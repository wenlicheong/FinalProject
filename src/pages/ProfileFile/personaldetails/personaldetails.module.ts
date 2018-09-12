import { NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {PersonaldetailsPage} from './personaldetails';

@NgModule({
    declarations:[
        PersonaldetailsPage
    ],
    imports: [
        IonicPageModule.forChild(PersonaldetailsPage)
    ],
    exports: [
        PersonaldetailsPage
    ],
})
export class PersonaldetailsPageModule {}