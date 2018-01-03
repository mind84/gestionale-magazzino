import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms'

import { ValidatorFn } from '@angular/forms';

export interface FieldConfig {
  disabled?: boolean,
  label?: string,
  formControlName: string,
  options?: string[],
  placeholder?: string,
  type: string,
  customClass?:string;
  displayInline?:boolean,
  validation?: ValidatorFn[],
  value?: any,
  changeFunction?:any,
  linkedField?:string[]
  typeSearch?:any
}

export interface Field {
  config: FieldConfig,
  group: FormGroup
}
