import { Component, OnInit } from '@angular/core';
import {Field} from '../../interfaces/form-interface'
import {FieldConfig} from '../../interfaces/form-interface'

import {FormGroup} from '@angular/forms'


@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.css']
})
export class FormInputComponent implements Field {

  constructor() { }
    config: FieldConfig;
    group:FormGroup


}
