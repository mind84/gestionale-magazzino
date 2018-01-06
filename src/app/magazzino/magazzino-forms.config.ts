import {Field} from '../shared/interfaces/form-interface'
import {FieldConfig} from '../shared/interfaces/form-interface'
import {Validators} from '@angular/forms'
import {HOSTSTYLE} from '../shared/interfaces/form-interface'
import {MaterialiService} from '../services/materiali.service'
import {Injectable} from '@angular/core'

@Injectable()
export class SearchFormsFieldConf {
  public fields:FieldConfig[];
  constructor(searchServiceInstance?:any, parentSubscriptionInstance?:any){
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
       searchFunction: searchServiceInstance.findFunction,
       manageByParent:true
     },
     elementStyle: ['large'],
     linkedField: ["code"],
     ancestorNotification:parentSubscriptionInstance.setCurrArt
   },
   {
     type:'button',
     label:'Cerca',
     formControlName:'submit'
   }
 ]
  }
}
