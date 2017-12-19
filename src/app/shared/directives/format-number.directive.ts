import { Directive, HostListener, ElementRef, OnInit } from "@angular/core";
import {NumberFormatPipe} from "../pipes/number-format.pipe"

@Directive({
  selector: '[appFormatNumber]',
  providers: [NumberFormatPipe]
})
export class FormatNumberDirective implements OnInit {

  constructor(
    private el:ElementRef,
    private pipe: NumberFormatPipe
  ) { }
  ngOnInit() {
  }


  @HostListener("blur", ["$event.target.value"])
  onBlur(val){
    this.el.nativeElement.value= this.pipe.transform(this.el.nativeElement.value);
  }
}
