import { Component, OnInit, ElementRef, HostListener, Input, AfterViewInit, ComponentRef, OnDestroy, ViewContainerRef, ComponentFactoryResolver, OnChanges, Output,EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import {FieldConfig} from '../interfaces/form-interface'
@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit {

  dynForm:FormGroup;

  @Input()
  config: FieldConfig[];
  @Output()
  parentNotification: EventEmitter<any> = new EventEmitter<any>();

  get controls() { return this.config.filter(({type}) => type !== 'button'); }

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
      this.dynForm = this.createFormGroup()
  }

  createFormGroup(){
      const group = this.fb.group({})
      //creazione dinamica dei controlli in init
      this.controls.forEach(control=> group.addControl(control.formControlName,this.createControl(control)))
      return group;

  }
  createControl(config: FieldConfig) {
    const { disabled, validation, value } = config;
    return this.fb.control({ disabled, value }, validation);
  }
}
