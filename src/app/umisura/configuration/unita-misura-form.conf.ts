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

export const INSERT_UMISURA_FORM_FIELDS:FieldConfig[]= [
  {
    label: "Che tipo di unità di misura ti serve?",
    formControlName: "refId",
    type: TYPEINPUT.select,
    populateOptions: 'getUMMain',
    linkedFields: ['umref','umrefsymb', 'reminder'],
    ngvalue:'id',
    validation:[Validators.required],
    castToOptions: {
      name: 'descr',
      id: 'id'
    },
    elementStyle: ['medium']
  },
  {
    label: "Riferimento principale",
    formControlName: "umref",
    dbAlias:'umsymb',
    type: TYPEINPUT.input,
    disabled:true
  },
  {
    label: "",
    showLabel:false,
    formControlName: "umrefsymb",
    dbAlias:'umdesc',
    type: TYPEINPUT.input,
    disabled:true
  },
  {
    label:'Nome nuova unità di misura',
    formControlName:'umdesc',
    type: TYPEINPUT.input,
    validation: [Validators.required],
    hostStyle: [HOSTSTYLE.block]
  },
  {
    label:'Simbolo',
    formControlName:'umsymb',
    type: TYPEINPUT.input,
    validation: [Validators.required],
  },
  {
    label:'sono pari a',
    formControlName:'conversione',
    controlDirectives: ['appFormatNumber'],
    type: TYPEINPUT.input,
    validation: [Validators.required],
  },
  {
    label:'',
    showLabel:false,
    formControlName:'reminder',
    dbAlias:'umsymb',
    type: TYPEINPUT.input,
    disabled:true,
    elementStyle:['flat']
  },
  {
    type:TYPEINPUT.button,
    label:'Inserisci',
    formControlName:'submit',
    elementStyle:['insertButtonStandard']
  }
]

export const UPDATE_UMISURA_FORM_FIELDS:FieldConfig[]= [
  {
    label: "Che tipo di unità di misura ti serve?",
    formControlName: "refId",
    type: TYPEINPUT.select,
    populateOptions: 'getUMMain',
    linkedFields: ['umref','umrefsymb', 'reminder'],
    ngvalue:'id',
    validation:[Validators.required],
    castToOptions: {
      name: 'descr',
      id: 'id'
    },
    elementStyle: ['medium']
  },
  {
    label: "Riferimento principale",
    formControlName: "umref",
    dbAlias:'umsymb',
    type: TYPEINPUT.input,
    disabled:true
  },
  {
    label: "",
    showLabel:false,
    formControlName: "umrefsymb",
    dbAlias:'umdesc',
    type: TYPEINPUT.input,
    disabled:true
  },
  {
    label:'Nome nuova unità di misura',
    formControlName:'umdesc',
    type: TYPEINPUT.input,
    validation: [Validators.required],
    hostStyle: [HOSTSTYLE.block]
  },
  {
    label:'Simbolo',
    formControlName:'umsymb',
    type: TYPEINPUT.input,
    validation: [Validators.required],
  },
  {
    label:'sono pari a',
    formControlName:'conversione',
    controlDirectives: ['appFormatNumber'],
    type: TYPEINPUT.input,
    validation: [Validators.required],
  },
  {
    label:'',
    showLabel:false,
    formControlName:'reminder',
    dbAlias:'umsymb',
    type: TYPEINPUT.input,
    disabled:true,
    elementStyle:['flat']
  },
  {
    type:TYPEINPUT.button,
    label:'Aggiorna',
    formControlName:'submit',
    elementStyle:['insertButtonStandard']
  }
]
