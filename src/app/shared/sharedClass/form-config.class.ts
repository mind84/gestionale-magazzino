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
     type: null,
     options: [],
     placeholder: "",
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
    const returnConfig =  opts.map(singleConf=>
      Object.assign(Object.assign({},this.field), singleConf)
    )
    return returnConfig;
  }
/*
[
  {
disabled:false,
label: "Codice Articolo",
formControlName: "code",
type: TYPEINPUT.input,
},
{
disabled:false,
label: "Nome",
formControlName: "name",
type: TYPEINPUT.input,
textSearchFunction:'materialiSearch',//searchServiceInstance.findFunction,
elementStyle: ['large'],
},
{
type:TYPEINPUT.button,
label:'Cerca',
formControlName:'submit'
}
]*/

}
/*
@Injectable()
export class AddFormsFieldConf {
  public fields:FieldConfig[];
  constructor(){
     this.fields=
     [
       {
     disabled:false,
     label: "Quantità da aggiungere",
     formControlName: "quantity",
     type: TYPEINPUT.input,
     validation:[Validators.required,gtZero]
   },
   {
     disabled:false,
     label: "Nome",
     formControlName: "motivazioni",
     type: TYPEINPUT.select,
     elementStyle: ['large']
   },
   {
     type:TYPEINPUT.button,
     label:'Aggiungi',
     formControlName:'submit'
   }
 ]
  }
}*/
