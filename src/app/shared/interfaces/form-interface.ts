import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms'

import { ValidatorFn } from '@angular/forms';

export enum HOSTSTYLE {
  block="block",
}
export interface TextSearchInterface {
        searchFunction:Function
}
export enum TYPEINPUT {
  input='input',
  select='select',
  checkbox='checkbox',
  radiobutton='radiobutton',
  button='button'
}

interface InputConfig {
  searchFunction?:Function,
  linkedFields?:string[] | string
  onBlurFunction?: Function,
  onKeyUpFunction?: Function
}
interface SelectConfig {
  textSearch?:Function,
  linkedFields?:string[] | string
  onBlurFunction?: Function,
  onKeyUpFunction?: Function
}

export interface FieldConfig {
  disabled?: boolean,
  label?: string,
  formControlName: string,
  options?: string[],
  placeholder?: string,
  type: TYPEINPUT,
  typeConfig?:InputConfig | SelectConfig,
  hostStyle?: HOSTSTYLE[],
  containerStyle?: String[],
  elementStyle?:String[],
  validation?: ValidatorFn[],
  value?: any,
  afterChanges?:{
    isAlreadySubmitted?: boolean
  }
}

export interface Field {
  config: FieldConfig,
  group: FormGroup
}

export interface FormChanges {
  targetForm?:string,
  valueToUpdate:any,
  formControlName:string,
  fromService?:any
}
