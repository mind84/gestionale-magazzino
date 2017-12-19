import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormat'
})
export class NumberFormatPipe implements PipeTransform {
  private CHECKCHAR:string = ",";
  private SUBSTCHAR:string="."
  transform(value: string): any {
    let control = value.split(this.CHECKCHAR)
    if (control.length>0){
      value = control.join(this.SUBSTCHAR)
    }
    let position = value.split(this.SUBSTCHAR)
    if (position[0]=="") {
      position[0] = "0";
      value = position.join(".")
    }
    if (value !="0" && value !="." && !Number(value)) value = "";

    return value;
  }

}
