import {FieldConfig} from '../../shared/interfaces/form-interface'
import {Validators} from '@angular/forms'
import {HOSTSTYLE, TYPEINPUT} from '../../shared/interfaces/form-interface'
import * as Vf from '../../shared/functions/validators';


export const SEARCHFIELDS:FieldConfig[]= [

  {
    disabled:false,
    label: "Nome Fornitore",
    formControlName: "name",
    type: TYPEINPUT.input,
    textSearchFunction:'fornitoriSearch',
    linkedFields:['code'],
    elementStyle: ['large'],
  },
  {
    type:TYPEINPUT.input,
    label:'',
    inputType:'hidden',
    formControlName:'code',
  },
  {
    type:TYPEINPUT.button,
    label:'Cerca',
    formControlName:'submit'
  }
]

export const INSERTFORNITORIFORMFIELDS:FieldConfig[]= [
  {
    label: "Nome Fornitore",
    formControlName: "name",
      elementStyle: ['large'],
    type: TYPEINPUT.input,
    validation:[Validators.required],
    hostStyle:[HOSTSTYLE.block]
  },
  {
    label: "Sconto applicato",
    formControlName: "sconto",
    type: TYPEINPUT.input,
    validation:[Validators.required],
    hostStyle:[HOSTSTYLE.block],
    controlDirectives:['appFormatNumber']
  },
  {
    label: "mail fornitore",
    formControlName: "mail",
    type: TYPEINPUT.input,
    elementStyle: ['large'],
    hostStyle:[HOSTSTYLE.block]
  },
  {
    label: "Telefono fornitore",
    formControlName: "telefono",
    type: TYPEINPUT.input,
    controlDirectives:['appFormatNumber'],
    hostStyle:[HOSTSTYLE.block]
  },
  {
    label: "Indirizzo fornitore",
    elementStyle: ['xl'],
    formControlName: "indirizzo",
    type: TYPEINPUT.input,
  },
  {
    label: "Note",
    formControlName: "note",
    type: TYPEINPUT.input,
    elementStyle: ['xl'],
    hostStyle:[HOSTSTYLE.block]
  },
  {
    type:TYPEINPUT.button,
    label:'Inserisci',
    formControlName:'submit',
    elementStyle:['insertButtonStandard']
  }
]

export const UPDATE_FORNITORI_FORM_FIELDS:FieldConfig[]= [
  {
    label: "Nome Fornitore",
    formControlName: "name",
      elementStyle: ['large'],
    type: TYPEINPUT.input,
    validation:[Validators.required],
    hostStyle:[HOSTSTYLE.block]
  },
  {
    label: "Sconto applicato",
    formControlName: "sconto",
    type: TYPEINPUT.input,
    validation:[Validators.required],
    hostStyle:[HOSTSTYLE.block],
    controlDirectives:['appFormatNumber']
  },
  {
    label: "mail fornitore",
    formControlName: "mail",
    type: TYPEINPUT.input,
    elementStyle: ['large'],
    hostStyle:[HOSTSTYLE.block]
  },
  {
    label: "Telefono fornitore",
    formControlName: "telefono",
    type: TYPEINPUT.input,
    controlDirectives:['appFormatNumber'],
    hostStyle:[HOSTSTYLE.block]
  },
  {
    label: "Indirizzo fornitore",
    elementStyle: ['xl'],
    formControlName: "indirizzo",
    type: TYPEINPUT.input,
  },
  {
    label: "Note",
    formControlName: "note",
    type: TYPEINPUT.input,
    elementStyle: ['xl'],
    hostStyle:[HOSTSTYLE.block]
  },
  {
    type:TYPEINPUT.button,
    label:'Aggiorna',
    formControlName:'submit',
    elementStyle:['insertButtonStandard']
  }
]
