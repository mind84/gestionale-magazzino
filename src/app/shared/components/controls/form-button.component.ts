import { Component, OnInit } from '@angular/core';
import {Field} from '../../interfaces/form-interface'
import {FieldConfig} from '../../interfaces/form-interface'

import {FormGroup} from '@angular/forms'

@Component({
  selector: 'app-form-button',
  templateUrl: './form-button.component.html',
  styleUrls: ['./form-button.component.css']
})
export class FormButtonComponent implements Field {

  constructor() { }

  config: FieldConfig;
  group:FormGroup
}
