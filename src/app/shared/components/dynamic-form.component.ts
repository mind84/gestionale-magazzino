import { Component, OnInit, ElementRef, HostListener, Input, AfterViewInit, ComponentRef, OnDestroy, ViewContainerRef, ComponentFactoryResolver, OnChanges, Output,EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import {FieldConfig, FormChanges, FormConfig, SingleFormConf} from '../interfaces/form-interface';
import {FormService} from '../../services/form-service';



@Component({
  exportAs:'dynamicForm',
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css'],
  providers:[FormService]
})
export class DynamicFormComponent implements OnInit, OnChanges, SingleFormConf {

  dynForm:FormGroup;

  @Input()
  config: FieldConfig[];
  @Input()
    formConfig:SingleFormConf;
  @Output()
  notifyChanges: EventEmitter<FormChanges> = new EventEmitter<FormChanges>();
  @Output()
  formSubmit: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  formName:string;
  get controls() { return this.config.filter(({type}) => type !== 'button'); }
  get formValue(){return this.dynForm.value}
  get changes(){return this.dynForm.valueChanges}
  get valid() {return this.dynForm.valid}
  constructor(private fb: FormBuilder, private fs:FormService) { }

  ngOnInit() {
    this.formName = this.formConfig.formName;
      this.dynForm = this.createFormGroup()
      this.fs.pushChange$.subscribe((changes:FormChanges)=>{
        if(!changes.targetForm) changes.targetForm=this.formName;
        this.notifyChanges.emit(changes);
      })
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
updateWholeForm(changes:FormChanges){
  Object.keys(changes.fromService).forEach((key)=>{
    if (this.dynForm.controls[key]) this.dynForm.controls[key].setValue(changes.fromService[key])
  })

}
setFormValues(fields:string | object, whole:any){
 if (typeof fields == "object") {
  Object.keys(fields).forEach((key)=>{
    if (this.dynForm.controls[key] && (typeof whole == "boolean" ? whole : (whole.includes(key)? true : false))) this.dynForm.controls[key].setValue(fields[key])
    })
  }
  else {
    if (this.dynForm.controls[fields]) this.dynForm.controls[fields].setValue(whole)
  }

}

setValues(config:FieldConfig,change:FormChanges, wholeForm?:boolean){

    // if(change.fromService){
    //   if(config.typeConfig && config.typeConfig.linkedFields) {
    //     if(typeof config.typeConfig.linkedFields ==='string' && config.typeConfig.linkedFields=="allFields" || wholeForm ) {
    //       this.setFormValues(change.fromService, true)
    //       }
    //       else {
    //         this.setFormValues(change.formControlName, change.valueToUpdate)
    //         this.setFormValues(change.fromService, config.typeConfig.linkedFields)
    //       }
    //     }
    //     else {
    //       this.setFormValues(change.formControlName, change.valueToUpdate)
    //      }
    //   }
    }


  submit(el:any){
    event.preventDefault()
    event.stopPropagation()
    this.formSubmit.emit(el.getAttribute("form-name"))
  }

}
