import { NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {DrinksPage} from './drinks';

@NgModule({
    declarations:[
        DrinksPage
    ],
    imports: [
        IonicPageModule.forChild(DrinksPage)
    ],
    exports: [
        DrinksPage
    ],
})
export class DrinksPageModule {}