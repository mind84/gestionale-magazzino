import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms'

export function gtZero(input:FormControl){
  const isGTZero = input.value > 0
  return isGTZero ? null : {gtZero: false}
}

export const VALIDATOR_CONFIG = {
  required: 'Campo obbligatorio',
  gtZero: 'Specificare un numero maggiore di 0'
}
