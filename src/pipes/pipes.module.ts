import { NgModule } from '@angular/core';
import { PipesPipe, SafeStylePipe, bloodGroupPipe, swimmingAbilityPipe } from './pipes/pipes';
@NgModule({
	declarations: [PipesPipe,SafeStylePipe, bloodGroupPipe, swimmingAbilityPipe],
	imports: [],
	exports: [PipesPipe,SafeStylePipe, bloodGroupPipe, swimmingAbilityPipe]
})
export class PipesModule {}
