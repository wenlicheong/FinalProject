import { Component, Input, SimpleChanges } from '@angular/core';

/**
 * Generated class for the CircleBarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'circle-bar',
  templateUrl: 'circle-bar.html'
})
export class CircleBarComponent {

  @Input() value:number =0;

  public circumference: number =2*Math.PI*47;
  public strokeDashoffset: number=0;

  ngOnChanges(changes: SimpleChanges){
    if(changes['value']){
      this.onPercentageChanged(changes['value'].currentValue)
    }
  }

  onPercentageChanged(val:number){
    const offset = this.circumference - val/100 * this.circumference;
    this.strokeDashoffset = offset;
  }  
  constructor() {
    console.log('Hello CircleBarComponent Component');
    
  }

}
