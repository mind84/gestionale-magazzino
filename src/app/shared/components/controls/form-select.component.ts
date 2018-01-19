import { Component, OnInit, HostBinding, ChangeDetectorRef, ApplicationRef, Input } from '@angular/core';
import {Field} from '../../interfaces/form-interface'
import {FieldConfig, FormChanges, OptionsInterface} from '../../interfaces/form-interface'
import {FormService} from '../../../services/form-service'
import {FormGroup, AbstractControl} from '@angular/forms'


@Component({
  selector: 'app-form-select',
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.css']
})
export class FormSelectComponent implements Field, OnInit {
  @HostBinding('class') hostClasses:string;
  elementClasses:string;
  contClasses:string;
  control:AbstractControl;
  controlDirectivesObject:any;
  get classHost(){ return this.config.hostStyle}
  get classCont(){ return this.config.containerStyle}
  get classElem(){ return this.config.elementStyle}
  get controlDirectives() {
    let arrayObj:any={};
    this.config.controlDirectives.forEach(dirname =>{
      arrayObj[dirname] = true
    })
    return arrayObj;
  }
  get options(){return this.config.options}
  selectOptions:any;
  settedOption: OptionsInterface[];
  populateResults: any[];
  updateControl:Function;
  config: FieldConfig;
  group:FormGroup;
  @Input()
  patchValue:any;

  constructor(private fs:FormService, private cdr:ChangeDetectorRef, private appRef:ApplicationRef) {
    this.updateControl =  this.onChangesControl.bind(this)
  }

  ngOnInit(){
    this.addHostClasses(this.config)
    this.addElemClasses(this.config)
    this.control= this.group.get(this.config.formControlName)
    this.controlDirectivesObject= this.controlDirectives;

    if (this.options.length) {
      this.settedOption = this.options;
      this.selectOptions= this.settedOption[0].name;
      this.patchValues()
    }
    else if(this.config.populateOptions){
      this.fs[this.config.populateOptions]().subscribe((results:any) => {
      this.populateResults =results;
      this.settedOption=this.castToOptions(results);
        if (!this.patchValue) {
          this.selectOptions=this.config.ngvalue ?  this.settedOption[0][this.config.ngvalue] : this.settedOption[0];
        }
        else this.patchValues()
      })
    }
  }

  castToOptions(res:any):OptionsInterface[] {
    if (!this.config.castToOptions) return
    let options:OptionsInterface[] =[];
    res.forEach((response)=>{
      const name = response[this.config.castToOptions.name];
      const id = response[this.config.castToOptions.id];
      const opt:OptionsInterface = {
        name:name,
        id:id
      }
      options.push(opt)
    })
    return options;
  }

  patchValues(){
    if(this.patchValue) this.selectOptions = this.patchValue
  }

  addHostClasses(config:FieldConfig):void{
    if(this.classHost) this.hostClasses=this.classHost.join(" ");
  }

  addContClasses(config:FieldConfig):void{
    if(this.classCont) this.contClasses=this.classCont.join(" ");
  }

  addElemClasses(config:FieldConfig):void{
    if(this.classElem) this.elementClasses=this.classElem.join(" ");
  }

  onChangesControl(changes:any){
    let ObjChanged;
    if(changes && !this.config.onlySelf) {
      if (this.populateResults){
        ObjChanged = this.populateResults.filter((obj)=>{return obj[this.config.ngvalue] == changes})[0]
      }
      setTimeout(()=>{
        this.fs.pushChanges(this.config,{selectedOption:changes, updateObj:ObjChanged})
      },0)
    }
  }
}
