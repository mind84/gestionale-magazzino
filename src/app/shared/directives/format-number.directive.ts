import { Directive, HostListener, ElementRef, OnInit, Input } from "@angular/core";
import {NumberFormatPipe} from "../pipes/number-format.pipe"

@Directive({
  selector: '[appFormatNumber]',
  providers: [NumberFormatPipe]
})
export class FormatNumberDirective implements OnInit {

  @Input('appFormatNumber') enabled:boolean
  specialKeys: Array<string> = [ 'Backspace', 'Tab', 'End', 'Home'];
  private regex: RegExp = new RegExp(/^[0-9]+(\.[0-9]*){0,1}$/g);

  constructor(
    private el:ElementRef,
    private pipe: NumberFormatPipe
  ) { }
  ngOnInit() {

  }


  // @HostListener("blur", ["$event.target.value"])
  // onBlur(val){
  //   //if (this.enabled)
  //   //this.el.nativeElement.value= this.pipe.transform(this.el.nativeElement.value);
  // }

  @HostListener("keydown", ["$event"])
  onKeyDown(event:KeyboardEvent){
    if (this.enabled) {
      if (this.specialKeys.indexOf(event.key) !== -1) {
        return;
      }
      let current: string = this.el.nativeElement.value;
      let next: string = current.concat(event.key);
      if (next && !String(next).match(this.regex)) {
        event.preventDefault();
      }
    }
  }
}
