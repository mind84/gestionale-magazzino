import {Component, ViewChildren, OnInit, ElementRef,HostBinding, Input, AfterViewInit, ComponentRef, OnDestroy, ViewContainerRef, ComponentFactoryResolver, OnChanges, Output,EventEmitter } from '@angular/core';
import { AbstractControl,FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import {FieldConfig, FormChanges, FormConfig, SingleFormConf} from '../interfaces/form-interface';
import {FormService} from '../../services/form-service';

interface Update {
  control:string
  value:any
}

@Component({
  exportAs:'dynamicForm',
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css'],
  providers:[FormService]
})
export class DynamicFormComponent implements OnInit, OnChanges, SingleFormConf {
  @HostBinding('class') hostClasses:string;
  elementClasses:string;
  contClasses:string;
  get classHost(){ return this.formConfig.hostStyle}
  get classCont(){ return this.formConfig.containerStyle}
  get classElem(){ return this.formConfig.elementStyle}
  dynForm:FormGroup;

  @Input()
  config: FieldConfig[];
  @Input()
    formConfig:SingleFormConf;
  @Output()
  notifyChanges: EventEmitter<FormChanges> = new EventEmitter<FormChanges>();
  @Output()
  formSubmit: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @Input()
  insertResponse:any
  formName:string;


  get controls() { return this.config.filter(({type}) => type !== 'button'); }
  get formValue(){return this.dynForm.value}
  get changes(){return this.dynForm.valueChanges}
  get valid() {return this.dynForm.valid}
  constructor(private fb: FormBuilder, private fs:FormService) { }

  ngOnInit() {
    this.formName = this.formConfig.formName;
    this.addHostClasses(this.formConfig)
    this.addElemClasses(this.formConfig)
      this.dynForm = this.createFormGroup()
      // this.formChanges()
      this.fs.pushChange$.subscribe((changes:FormChanges)=>{
        if(!changes.targetForm) changes.targetForm=this.formName;
        this.notifyChanges.emit(changes);
      })
  }
  // formChanges(){
  //   this.controls.forEach(control=>{
  //     if(control.needUpdateAndValidity){
  //       this.dynForm.get(control.formControlName).valueChanges.subscribe((val)=>{
  //         console.log(val)
  //         this.dynForm.get(control.formControlName).updateValueAndValidity({onlySelf:true, emitEvent:false})
  //       })
  //     }
  //   })
  // }
  addHostClasses(config:SingleFormConf){
    if(this.classHost)
      this.hostClasses=this.classHost.join(" ");
  }

  addElemClasses(config:SingleFormConf){
    if(this.classElem)
      this.elementClasses=this.classElem.join(" ");
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
  displaySubmitResponse(response:any){
    this.insertResponse=response;
    setTimeout(()=>{this.insertResponse=null},2000)
  }
  createFormGroup(){
      const group = this.fb.group({})
      //creazione dinamica dei controlli in init
      this.controls.forEach(control=>
        group.addControl(control.formControlName,new FormControl(this.getState(control),{validators:control.validation, updateOn:control.updateOn})//this.createControl(control)
      )
      )
      return group;

  }
  getState(config:FieldConfig){
    const { disabled, value } = config;
    return {disabled,value}
  }
  createControl(config: FieldConfig) {
    const { disabled, validation, value } = config;
    let ctrl = this.fb.control({ disabled, value }, validation);
    return ctrl;//this.fb.control({ disabled, value }, validation,

  }
  addControl(config:FieldConfig){
    this.dynForm.addControl(config.formControlName,new FormControl(this.getState(config),{validators:config.validation, updateOn:config.updateOn}))//this.createControl(config))
  }
  removeControl(config:FieldConfig){
    this.dynForm.removeControl(config.formControlName);
  }
  setWarning(controlName:string,warn:string){
    let control = this.controls.filter((control)=> control.formControlName==controlName)[0]
    control.warns = warn;
    setTimeout(()=>{
      control.warns=null;
    },1900)

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

getControl(name:string):FieldConfig{
  return this.controls.filter((control)=> control.formControlName==name)[0]
}

setValue(update:Update){
    return this.dynForm.controls[update.control].setValue(update.value)
}
 getUpdateObject(fieldConf:FieldConfig,serviceObject:any):Update{
   let value = fieldConf.dbAlias? serviceObject[fieldConf.dbAlias] : serviceObject[fieldConf.formControlName]
    return {
      control: fieldConf.formControlName,
      value: value
    }

 }

updateFormValues(changes:FormChanges){
  //prendo la configurazione del campo in base al fomr name
  if(!changes.formControlName) throw 'nome controllo non specificato'
  let fieldConf = this.getControl(changes.formControlName);
  if(changes.fromService) {
    //recuperiamo gli alias da db per il singolo campo
    let updateArray:Update[] = []
    updateArray.push(this.getUpdateObject(fieldConf,changes.fromService))
    fieldConf.linkedFields.forEach(linkedField=>{
      updateArray.push(this.getUpdateObject(this.getControl(linkedField),changes.fromService))
    })
    updateArray.forEach((update)=>{
      this.setValue(update)
    })
  }
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

  submit(el:any){
    event.preventDefault()
    event.stopPropagation()
    this.formSubmit.emit(el.getAttribute("form-name"))
  }

}
