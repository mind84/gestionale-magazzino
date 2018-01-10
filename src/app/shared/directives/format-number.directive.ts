import { Directive, HostListener, ElementRef, OnInit, Input } from "@angular/core";
import {NumberFormatPipe} from "../pipes/number-format.pipe"

@Directive({
  selector: '[appFormatNumber]',
  providers: [NumberFormatPipe]
})
export class FormatNumberDirective implements OnInit {

  @Input('appFormatNumber') enabled:boolean
  // @Input() set appFormatNumber(val:any){
  //   if(val) this.enabled=true
  //   else this.enabled=false
  // }

  constructor(
    private el:ElementRef,
    private pipe: NumberFormatPipe
  ) { }
  ngOnInit() {
  }


  @HostListener("blur", ["$event.target.value"])
  onBlur(val){
    if (this.enabled)
    this.el.nativeElement.value= this.pipe.transform(this.el.nativeElement.value);
  }
}
