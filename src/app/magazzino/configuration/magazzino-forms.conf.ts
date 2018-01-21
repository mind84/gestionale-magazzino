import {FieldConfig} from '../../shared/interfaces/form-interface'
import {Validators} from '@angular/forms'
import {HOSTSTYLE, TYPEINPUT} from '../../shared/interfaces/form-interface'
import * as Vf from '../../shared/functions/validators';


export const SEARCHFIELDS:FieldConfig[]= [
  {
    disabled:false,
    label: "Codice Articolo",
    formControlName: "code",
    type: TYPEINPUT.input,
    updateOn:'change'
  },
  {
    disabled:false,
    label: "Nome",
    formControlName: "name",
    type: TYPEINPUT.input,
    textSearchFunction:'materialiSearch',//searchServiceInstance.findFunction,
    elementStyle: ['large'],
    updateOn:'change'
  },
  {
    type:TYPEINPUT.button,
    label:'Cerca',
    formControlName:'submit'
  }
]

export const ADDTRANSFIELDS:FieldConfig[]= [
  {
    disabled:false,
    label: "Quantità da aggiungere",
    formControlName: "quantity",
    type: TYPEINPUT.input,
    validation:[Validators.required,Vf.gtZero],
    controlDirectives: ['appFormatNumber']
  },
  {
    disabled:false,
    label: "Motivazioni",
    formControlName: "motivazioni",
    type: TYPEINPUT.select,
    validation:[Validators.required],
    elementStyle: ['large'],
    options: [
      {id:1, name:"Da Ordine"},
      {id:2, name:"Da Inventario"},
      {id:3, name: "Variazione Manuale"}
    ]
  },
  {
    visible:false,
    disabled:false,
    label: "Numero Ordine",
    formControlName: "numorder",
    validation:[Validators.required],
    type: TYPEINPUT.input,
  },
  {
    disabled:false,
    label: "Note",
    formControlName: "note",
    type: TYPEINPUT.input,
    elementStyle: ['xl'],
    hostStyle:[HOSTSTYLE.block]
  },
  {
    type:TYPEINPUT.button,
    label:'Aggiungi',
    formControlName:'submit',
    elementStyle:['insertButton']
  }
]


export const REMTRANSFIELDS:FieldConfig[]= [
  {
    disabled:false,
    label: "Quantità da sottrarre",
    formControlName: "quantity",
    type: TYPEINPUT.input,
    validation:[Validators.required,Vf.gtZero],
    controlDirectives: ['appFormatNumber']
  },
  {
    disabled:false,
    label: "Motivazioni",
    formControlName: "motivazioni",
    type: TYPEINPUT.select,
    validation:[Validators.required],
    elementStyle: ['large'],
    options: [
      {id:1, name:"Storno da Ordine"},
      {id:2, name:"Da Inventario"},
      {id:3, name: "Storno Manuale"}
    ]
  },
  {
    visible:false,
    disabled:false,
    label: "Numero Ordine",
    formControlName: "numorder",
    validation:[Validators.required],
    type: TYPEINPUT.input,
  },
  {
    disabled:false,
    label: "Note",
    formControlName: "note",
    type: TYPEINPUT.input,
    elementStyle: ['xl'],
    hostStyle:[HOSTSTYLE.block]
  },
  {
    type:TYPEINPUT.button,
    label:'Sottrai',
    formControlName:'submit',
    elementStyle:['removeButton']
  }
]
