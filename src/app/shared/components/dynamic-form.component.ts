import {Component, ViewChildren, OnInit, ElementRef,HostBinding, Input, ComponentRef, OnDestroy, ViewContainerRef, ComponentFactoryResolver, OnChanges, Output,EventEmitter } from '@angular/core';
import { AbstractControl,FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import {FieldConfig, FormChanges, FormConfig, SingleFormConf} from '../interfaces/form-interface';
import {FormService} from '../../services/form-service';
import * as _ from 'lodash'

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

  get controls() { return this.config.filter(({type}) => type !== 'button'); }
  get formValue(){return this.dynForm.value}
  get changes(){return this.dynForm.valueChanges}
  get valid() {return this.dynForm.valid}

  dynForm:FormGroup;
  _index:number

  @Input()
  config: FieldConfig[];
  @Input()
    formConfig:SingleFormConf;
  @Output()
  notifyChanges: EventEmitter<FormChanges> = new EventEmitter<FormChanges>();
  @Output()
  initialValue: EventEmitter<any> = new EventEmitter<any>()
  @Output()
  formSubmit: EventEmitter<any> = new EventEmitter<any>();
  @Input()
  insertResponse:any

  @Input('ind')
  set ind(v:any){
    this._index=v;
  }
  get ind(){return this._index}
  formName:string;

  _patchValues:any;
  @Input() set patchValues(val){
    if(val) this._patchValues = this.createPatchValues(val)
  }
  get patchValues(){return this._patchValues}

  constructor(private fb: FormBuilder, private fs:FormService) { }

  ngOnInit() {
    this.formName = this.formConfig.formName;
    this.addHostClasses(this.formConfig)
    this.addElemClasses(this.formConfig)
    this.dynForm = this.createFormGroup()
    this.fs.pushChange$.subscribe((changes:FormChanges)=>{
      if(!changes.targetForm) changes.targetForm=this.formName;
      this.notifyChanges.emit(changes);
    })
  }

  checkForChanges():any{
    let subjform ={};
    _.forIn(this.dynForm.getRawValue(), (v,k)=>{
      if (v !== this.patchValues[k]) subjform[k] = v;
    })
    if (_.isEmpty(subjform)) {
      return false
    }
    else return subjform;
  }

  createPatchValues(obj){
    if(!obj) return null;
    const caster:any = {}
    Object.keys(obj).forEach((key) =>{
      var fld = this.controls.filter((control) =>{ return control.formControlName == key || control.dbAlias == key })[0]
      if(fld) caster[fld.formControlName] = obj[key]
    })
    if(caster) this.initialValue.emit(caster);
    return caster;
  }
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
      group.addControl(control.formControlName,new FormControl(this.getState(control),{validators:control.validation, updateOn:control.updateOn}))
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
    return ctrl;
  }

  addControl(config:FieldConfig){
    this.dynForm.addControl(config.formControlName,new FormControl(this.getState(config),{validators:config.validation, updateOn:config.updateOn}))//this.createControl(config))
  }

  removeControl(config:FieldConfig){
    this.dynForm.removeControl(config.formControlName);
  }

  getControl(name:string):FieldConfig{
    return this.controls.filter((control)=> control.formControlName==name)[0]
  }

  runPreSubmitValidation():boolean{
    Object.keys(this.dynForm.controls).forEach(name =>{
      const control = this.dynForm.get(name)
      //se un input che ha un campo collegato nascosto è vuoto, svuota anche il campo collegato
      const fieldConf = this.controls.filter(conf=> {return conf.formControlName == name})[0]
      if (!control.value && (fieldConf.linkedFields.length >0)) {
        fieldConf.linkedFields.forEach(key => {
          this.dynForm.controls[key].setValue(null);
        })
      }
      control.markAsTouched();
      control.markAsDirty();
    })
    return this.dynForm.valid
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
      if(!changes.selectedOption) updateArray.push(this.getUpdateObject(fieldConf,changes.fromService))
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
    if (this.runPreSubmitValidation()){
      let passEv = [el.getAttribute("form-name"), this.ind];
      this.formSubmit.emit(passEv)
    }
  }
}
