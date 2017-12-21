import { NgModule } from '@angular/core';
import {FormatNumberDirective} from '../directives/format-number.directive'

@NgModule({
  declarations: [
    FormatNumberDirective
  ],
  exports: [
    FormatNumberDirective
  ]
})
export class DirectiveModule { }
