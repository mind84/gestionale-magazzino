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
  visible?:boolean
  disabled?: boolean,
  label?: string,
  formControlName: string,
  dbAlias?:string,
  linkedFields?:string[],
  needUpdateAndValidity?:boolean,
  updateOn?:any,
  options?: OptionsInterface[],
  placeholder?: string,
  type: TYPEINPUT,
  inputType?:string,
  showLabel?:boolean,
  textSearchFunction?:string | boolean,
  hostStyle?: HOSTSTYLE[],
  containerStyle?: string[],
  elementStyle?:string[],
  validation?: ValidatorFn[],
  value?: any,
  controlDirectives?:string[],
  warns?:string
}

export interface Field {
  config: FieldConfig,
  group: FormGroup
}

export interface FormChanges {
  targetForm?:string,
  valueToUpdate:any,
  formControlName:string,
  fromService?:any,
  selectedOption?:any
}
export interface SingleFormConf {
  formName:string,
  hostStyle?:string[],
  containerStyle?: string[],
  elementStyle?:string[],
}
export interface FormConfig  {
  [type:string]: SingleFormConf
}
export interface OptionsInterface {
  id:any,
  name:string
}
