import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms'

import { ValidatorFn } from '@angular/forms';

export interface FieldConfig {
  disabled?: boolean,
  label?: string,
  formControlName: string,
  options?: string[],
  placeholder?: string,
  type: string,
  validation?: ValidatorFn[],
  value?: any,
  changeFunction?:any,
  linkedField?:string[]
  typeSearch?:any
}

export interface ConfigForm {
  fieldConfig: FieldConfig[],
  group: FormGroup
}
