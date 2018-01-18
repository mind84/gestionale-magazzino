import {FieldConfig} from '../../shared/interfaces/form-interface'
import {Validators} from '@angular/forms'
import {HOSTSTYLE, TYPEINPUT} from '../../shared/interfaces/form-interface'
import * as Vf from '../../shared/functions/validators';


export const UPDATE_CATEGORIE_FORM_FIELDS:FieldConfig[]= [
  {
    label: "Nome",
    formControlName: "name",
    type: TYPEINPUT.input,
    validation:[Validators.required],
    hostStyle:[HOSTSTYLE.block]
  },
  {
    label: "Descrizione",
    formControlName: "descr",
    type: TYPEINPUT.input,
    validation:[Validators.required],
    elementStyle: ['large'],
    hostStyle:[HOSTSTYLE.block]
  },
  {
    type:TYPEINPUT.button,
    label:'Aggiorna',
    formControlName:'submit',
    elementStyle:['insertButtonStandard']
  }
]
