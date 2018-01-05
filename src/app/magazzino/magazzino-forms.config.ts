import {Field} from '../shared/interfaces/form-interface'
import {FieldConfig} from '../shared/interfaces/form-interface'
import {Validators} from '@angular/forms'
import {HOSTSTYLE} from '../shared/interfaces/form-interface'
import {MaterialiService} from '../services/materiali.service'
import {Injectable} from '@angular/core'

@Injectable()
export class SearchFormsFieldConf {
  public fields:FieldConfig[];
  constructor(servInstance?:any){
     this.fields=
     [
       {
     disabled:false,
     label: "Codice Articolo",
     formControlName: "code",
     type: "input",
     linkedField: ["name"]
   },
   {
     disabled:false,
     label: "Nome",
     formControlName: "name",
     type: "input",
     textSearch: {
       searchFunction: servInstance.findFunction,
       subsFunction: servInstance.subsFunction
     },
     elementStyle: ['large'],
     linkedField: ["code"]
   },
   {
     type:'button',
     label:'Cerca',
     formControlName:'submit'
   }
 ]
  }
}
