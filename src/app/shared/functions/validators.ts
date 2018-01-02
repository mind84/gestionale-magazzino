import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms'
export function gtZero(input:FormControl){
  const isGTZero = input.value > 0
  return isGTZero ? null : {gtZero: false}
}
