import {Field} from '../../shared/interfaces/form-interface'
import {FieldConfig} from '../../shared/interfaces/form-interface'
import {Validators} from '@angular/forms'
import {HOSTSTYLE, TYPEINPUT} from '../../shared/interfaces/form-interface'
import {gtZero} from '../../shared/functions/validators';
import {Injectable} from '@angular/core'

@Injectable()
export class DynFormsFieldConf {
  field:FieldConfig;
  constructor(){
     this.field = {
      visible:true,
     disabled:false,
     label: "",
     formControlName: "",
     updateOn:'blur',
     dbAlias:'',
     type: null,
     populateOptions: null,
     options: [],
     ngvalue:'name',
     castToOptions:null,
     onlySelf:false,
     linkedFields:[],
     placeholder: "",
     inputType:'text',
     showLabel:true,
     textSearchFunction:false,
     hostStyle: [],
     containerStyle: [],
     elementStyle:[],
     validation: [],
     value: null,
     controlDirectives:[],
     warns:null
   }
  }
  getFormFields(opts:FieldConfig[]):FieldConfig[] {
    const returnConfig =  opts.map(singleConf=>{
      if (singleConf.inputType==='hidden') singleConf.showLabel=false
      if (singleConf.type === 'select') singleConf.updateOn='change';
      if(singleConf.options && singleConf.options.length) singleConf.populateOptions=null;
      return Object.assign(Object.assign({},this.field), singleConf)
    }
    )

    return returnConfig;
  }

}
