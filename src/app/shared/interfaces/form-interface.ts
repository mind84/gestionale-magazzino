import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms'

import { ValidatorFn } from '@angular/forms';

export enum HOSTSTYLE {
  block="block",
}
export interface TextSearchInterface {
        searchFunction:Function,
        subsFunction:Function
}

export interface FieldConfig {
  disabled?: boolean,
  label?: string,
  formControlName: string,
  options?: string[],
  placeholder?: string,
  type: string,
  textSearch?: TextSearchInterface,
  hostStyle?: HOSTSTYLE[],
  containerStyle?: String[],
  elementStyle?:String[],
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
