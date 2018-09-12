import { NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {TourguidePage} from './tourguide';

@NgModule({
    declarations:[
        TourguidePage
    ],
    imports: [
        IonicPageModule.forChild(TourguidePage)
    ],
    exports: [
        TourguidePage
    ],
})
export class TourguideModule {}