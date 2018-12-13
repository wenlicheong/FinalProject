import { Component, Input } from '@angular/core';

/**
 * Generated class for the PogressBarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'pogress-bar',
  templateUrl: 'pogress-bar.html'
})
export class PogressBarComponent {

  @Input('pogress') pogress;
  

  constructor() {
    console.log('Hello PogressBarComponent Component');
   
  }

}
