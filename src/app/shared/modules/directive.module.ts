import { NgModule } from '@angular/core';
import {FormatNumberDirective} from '../directives/format-number.directive'
import { DisplayResponseDirective } from '../directives/display-response.directive'

@NgModule({
  declarations: [
    FormatNumberDirective,
    DisplayResponseDirective
  ],
  exports: [
    FormatNumberDirective,
    DisplayResponseDirective 
  ]
})
export class DirectiveModule { }
