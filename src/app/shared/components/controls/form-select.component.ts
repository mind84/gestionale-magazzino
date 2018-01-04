import { Component, OnInit } from '@angular/core';
import {Field} from '../../interfaces/form-interface'
import {FieldConfig} from '../../interfaces/form-interface'

import {FormGroup} from '@angular/forms'


@Component({
  selector: 'app-form-select',
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.css']
})
export class FormSelectComponent implements Field {

  constructor() { }

  config: FieldConfig;
  group:FormGroup
}
