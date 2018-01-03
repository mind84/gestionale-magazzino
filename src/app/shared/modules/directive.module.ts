import { NgModule } from '@angular/core';
import {FormatNumberDirective} from '../directives/format-number.directive'
import { DisplayResponseDirective } from '../directives/display-response.directive'
import { TextSearchDirective } from '../directives/text-search.directive';
import { DynamicControlsDirective } from '../directives/dynamic-controls.directive';

@NgModule({
  declarations: [
    FormatNumberDirective,
    DisplayResponseDirective,
    TextSearchDirective,
    DynamicControlsDirective
  ],
  exports: [
    FormatNumberDirective,
    DisplayResponseDirective,
    TextSearchDirective,
    DynamicControlsDirective 
  ]
})
export class DirectiveModule { }
