import {ConfigForm} from '../shared/interfaces/form-interface'
import {FieldConfig} from '../shared/interfaces/form-interface'
import {Validators} from '@angular/forms'

export const SEARCH_FORM_FIELDS:FieldConfig[] = [
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
    linkedField: ["code"],
    typeSearch: 'textSearch'
  }
]
