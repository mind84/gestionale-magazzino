import {Field} from '../shared/interfaces/form-interface'
import {FieldConfig} from '../shared/interfaces/form-interface'
import {Validators} from '@angular/forms'

export const SEARCH_FORM_FIELDS:FieldConfig[] = [
  {
    disabled:false,
    label: "Codice Articolo",
    formControlName: "code",
    type: "input",
    customClass:"long",
    displayInline:true,
    linkedField: ["name"]
  },
  {
    disabled:false,
    label: "Nome",
    formControlName: "name",
    type: "input",
    displayInline:true,
    linkedField: ["code"],
    typeSearch: 'textSearch'
  }
]
