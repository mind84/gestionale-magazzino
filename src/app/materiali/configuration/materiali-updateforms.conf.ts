import {FieldConfig} from '../../shared/interfaces/form-interface'
import {Validators} from '@angular/forms'
import {HOSTSTYLE, TYPEINPUT} from '../../shared/interfaces/form-interface'
import * as Vf from '../../shared/functions/validators';


export const UPDATE_MATERIALI_FORM_FIELDS:FieldConfig[]= [
  {
    label: "Codice articolo",
    formControlName: "code",
    type: TYPEINPUT.input,
    validation:[Validators.required],
    hostStyle:[HOSTSTYLE.block]
  },
  {
    label: "Nome",
    formControlName: "name",
    type: TYPEINPUT.input,
    validation:[Validators.required],
    elementStyle: ['large'],
    hostStyle:[HOSTSTYLE.block]
  },
  {
    label: "Categoria",
    formControlName: "categname",
    dbAlias:'name',
    type: TYPEINPUT.input,
    validation:[Validators.required],
    textSearchFunction:'categorieSearch',
    linkedFields:['categ'],
    elementStyle: ['large'],
    hostStyle:[HOSTSTYLE.block]
  },
  {
    type:TYPEINPUT.input,
    label:'',
    inputType:'hidden',
    formControlName:'categ',
    dbAlias:'id'
  },
  {
    label: "N articoli/collo",
    formControlName: "collobj",
    validation:[Validators.required],
    type: TYPEINPUT.input,
    controlDirectives:['appFormatNumber']
  },
  {
    label: "Quantità singolo articolo",
    formControlName: "qta",
    validation:[Validators.required],
    type: TYPEINPUT.input,
    controlDirectives:['appFormatNumber']
  },
  {
    label: "Unità di misura",
    formControlName: "umId",
    validation:[Validators.required],
    type: TYPEINPUT.select,
    controlDirectives:['appFormatNumber'],
    populateOptions: 'getUM',
    ngvalue:'id',
    castToOptions: {
      name: 'umsymb',
      id: 'id'
    },
    onlySelf:true
  },
  {
    label: "Prezzo per collo",
    formControlName: "price",
    validation:[Validators.required],
    type: TYPEINPUT.input,
    controlDirectives:['appFormatNumber'],
    hostStyle:[HOSTSTYLE.block]
  },
  {
    label: "Fornitore",
    formControlName: "fornitore",
    validation:[Validators.required],
    type: TYPEINPUT.input,
    hostStyle:[HOSTSTYLE.block]
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