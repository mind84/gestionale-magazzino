import {FieldConfig} from '../../shared/interfaces/form-interface'
import {Validators} from '@angular/forms'
import {HOSTSTYLE, TYPEINPUT} from '../../shared/interfaces/form-interface'
import * as Vf from '../../shared/functions/validators';


export const SEARCHFIELDS:FieldConfig[]= [
  {
    disabled:false,
    label: "Simbolo",
    formControlName: "umsymb",
    type: TYPEINPUT.select,
    updateOn:'change',
    populateOptions: 'getUM',
    linkedFields: ['umdesc'],
    ngvalue:'id',
    castToOptions: {
      name: 'umsymb',
      id: 'id'
    }
  },
  {
    label: "Nome unità di misura",
    formControlName: "umdesc",
    type: TYPEINPUT.input,
    disabled:true
  },
  {
    type:TYPEINPUT.button,
    label:'Cerca',
    formControlName:'submit'
  }
]

export const INSERT_CATEGORIE_FORM_FIELDS:FieldConfig[]= [
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
    label:'Inserisci',
    formControlName:'submit',
    elementStyle:['insertButtonStandard']
  }
]
