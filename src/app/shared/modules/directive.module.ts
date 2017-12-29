import { NgModule } from '@angular/core';
import {FormatNumberDirective} from '../directives/format-number.directive'
import { DisplayResponseDirective } from '../directives/display-response.directive'
import { TextSearchDirective } from '../directives/text-search.directive';

@NgModule({
  declarations: [
    FormatNumberDirective,
    DisplayResponseDirective,
    TextSearchDirective
  ],
  exports: [
    FormatNumberDirective,
    DisplayResponseDirective,
    TextSearchDirective 
  ]
})
export class DirectiveModule { }
