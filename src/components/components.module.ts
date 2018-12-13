import { NgModule } from '@angular/core';
import { PogressBarComponent } from './pogress-bar/pogress-bar';
import { CircleBarComponent } from './circle-bar/circle-bar';

@NgModule({
	declarations: [PogressBarComponent,
    CircleBarComponent],
	imports: [],
	exports: [PogressBarComponent,
    CircleBarComponent]
})
export class ComponentsModule {}
