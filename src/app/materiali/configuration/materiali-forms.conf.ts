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
    elementStyle: ['large'],
        updateOn:'change'
  },
  {
    type:TYPEINPUT.input,
    label:'Categoria',
    textSearchFunction:'categorieSearch',
    dbAlias:'name',
    linkedFields:['categ'],
    formControlName:'categname'
  },
  {
    type:TYPEINPUT.input,
    label:'',
    inputType:'hidden',
    formControlName:'categ',
    dbAlias:'id'
  },
  {
    type:TYPEINPUT.button,
    label:'Cerca',
    formControlName:'submit'
  }
]

export const INSERTMATERIALIFORMFIELDS:FieldConfig[]= [
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
    validation:[Validators.required],
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
    populateOptions: 'getUM',
    ngvalue:'id',
    castToOptions: {
      name: 'umsymb',
      id: 'id'
    },
    onlySelf:true
  },
  {
    label: "Fornitore",
    formControlName: "fornitore",
    dbAlias:'name',
    validation:[Validators.required],
    textSearchFunction:'fornitoriSearch',
    linkedFields:['forncode', 'scontoforn'],
    type: TYPEINPUT.input,
    hostStyle:[HOSTSTYLE.block]
  },
  {
    label: "",
    formControlName: "forncode",
    validation:[Validators.required],
    inputType:'hidden',
    dbAlias:'code',
    type: TYPEINPUT.input,
  },
  {
    label: "Prezzo per collo",
    formControlName: "price",
    validation:[Validators.required],
    type: TYPEINPUT.input,
    controlDirectives:['appFormatNumber'],
    simpleChange:true,
    linkedSimpleChangeFields:['prezzofinale'],
    paramSimpleChange:['price','scontoforn','scontoprod'],
    simleChangeFunction:'prezzoArticolo'
  },
  {
    label: "Sconto Fornitore",
    formControlName: "scontoforn",
    dbAlias:'sconto',
    isFormControl:false,
    type: TYPEINPUT.input,
    disabled:true,
    simpleChange:true,
    linkedSimpleChangeFields:['prezzofinale'],
    paramSimpleChange:['price','scontoforn','scontoprod'],
    simleChangeFunction:'prezzoArticolo'
  },
  {
    label: "Sconto Aggiuntivo",
    formControlName: "scontoprod",
    validation:[Validators.required],
    type: TYPEINPUT.input,
    controlDirectives:['appFormatNumber'],
    simpleChange:true,
    linkedSimpleChangeFields:['prezzofinale'],
    paramSimpleChange:['price','scontoforn','scontoprod'],
    simleChangeFunction:'prezzoArticolo'

  },
  {
    label: "Prezzo finale",
    formControlName: "prezzofinale",
    validation:[Validators.required],
    type: TYPEINPUT.input,
    controlDirectives:['appFormatNumber'],
    disabled:true
  },
  {
    label: "IVA",
    formControlName: "iva",
    validation:[Validators.required],
    type: TYPEINPUT.input,
    controlDirectives:['appFormatNumber']
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
    dbAlias:'name',
    validation:[Validators.required],
    textSearchFunction:'fornitoriSearch',
    linkedFields:['forncode'],
    type: TYPEINPUT.input,
    hostStyle:[HOSTSTYLE.block]
  },
  {
    label: "",
    formControlName: "forncode",
    validation:[Validators.required],
    inputType:'hidden',
    dbAlias:'code',
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
