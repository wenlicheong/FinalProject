import { NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {HawkerPage} from './hawker';

@NgModule({
    declarations:[
        HawkerPage
    ],
    imports: [
        IonicPageModule.forChild(HawkerPage)
    ],
    exports: [
        HawkerPage
    ],
})
export class HawkerPageModule {}