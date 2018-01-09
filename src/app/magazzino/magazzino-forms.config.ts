import {Field} from '../shared/interfaces/form-interface'
import {FieldConfig} from '../shared/interfaces/form-interface'
import {Validators} from '@angular/forms'
import {HOSTSTYLE, TYPEINPUT} from '../shared/interfaces/form-interface'
import {gtZero} from '../shared/functions/validators';
import {MaterialiService} from '../services/materiali.service'
import {Injectable} from '@angular/core'

@Injectable()
export class SearchFormsFieldConf {
  public fields:FieldConfig[];
  constructor(searchServiceInstance?:any){
     this.fields=
     [
       {
     disabled:false,
     label: "Codice Articolo",
     formControlName: "code",
     type: TYPEINPUT.input,
     afterChanges: {
       isAlreadySubmitted:true
     },
     typeConfig:{
       linkedFields:'allFields'
     },
   },
   {
     disabled:false,
     label: "Nome",
     formControlName: "name",
     type: TYPEINPUT.input,
     typeConfig:{
       searchFunction:searchServiceInstance.findFunction,
       linkedFields:'allFields'
     },
     elementStyle: ['large'],
     afterChanges: {
       isAlreadySubmitted:true
     }
   },
   {
     type:TYPEINPUT.button,
     label:'Cerca',
     formControlName:'submit'
   }
 ]
  }
}

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
}
