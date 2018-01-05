import { Component, OnInit, ElementRef, HostListener, Input, AfterViewInit, ComponentRef, OnDestroy, ViewContainerRef, ComponentFactoryResolver, OnChanges, Output,EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import {FieldConfig} from '../interfaces/form-interface'
@Component({
  exportAs:'dynamicForm',
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit, OnChanges {

  dynForm:FormGroup;

  @Input()
  config: FieldConfig[];
  @Output()
  parentNotification: EventEmitter<any> = new EventEmitter<any>();

  get controls() { return this.config.filter(({type}) => type !== 'button'); }
  get formValue(){return this.dynForm.value}
  get changes(){return this.dynForm.valueChanges}
  get valid() {return this.dynForm.valid}
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
      this.dynForm = this.createFormGroup()
      this.onFormChange(this.dynForm)
  }

  ngOnChanges(){
    if(this.dynForm){
      const controls = Object.keys(this.dynForm.controls)
      const configControls = this.controls.map((item)=>item.formControlName)

      controls
        .filter((control)=> !configControls.includes(control))
        .forEach((control)=> this.dynForm.removeControl(control))

      configControls
      .filter((control)=>!controls.includes(control))
      .forEach((name)=>{
        const config = this.config.find((control)=> control.formControlName === name)
        this.dynForm.addControl(name, this.createControl(config))
      })
    }
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
  setDisabled(name:string, disabled:boolean){
    if(this.dynForm.controls[name]){
      const method = disabled ? 'disable' : 'enable'
      this.dynForm.controls[name][method]();
    }
  }
  submit(event:Event){
    event.preventDefault()
    event.stopPropagation()
    this.parentNotification.emit(this.formValue)
  }
  onFormChange(form:FormGroup){
    form.valueChanges.subscribe(()=>{
      console.log("changed")
    })
  }
}
