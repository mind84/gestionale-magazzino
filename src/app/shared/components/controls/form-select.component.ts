import { Component, OnInit, HostBinding } from '@angular/core';
import {Field} from '../../interfaces/form-interface'
import {FieldConfig, FormChanges} from '../../interfaces/form-interface'
import {FormService} from '../../../services/form-service'
import {FormGroup, AbstractControl} from '@angular/forms'


@Component({
  selector: 'app-form-select',
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.css']
})
export class FormSelectComponent implements Field {
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
  updateControl:Function;
    constructor(private fs:FormService) {
      this.updateControl =  this.onChangesControl.bind(this)
    }
      config: FieldConfig;
      group:FormGroup

      ngOnInit(){
        this.addHostClasses(this.config)
        this.addElemClasses(this.config)
        this.control= this.group.get(this.config.formControlName)
        this.controlDirectivesObject= this.controlDirectives;
        this.selectOptions= this.options[0].name
      }

      addHostClasses(config:FieldConfig):void{
        if(this.classHost) {
          this.hostClasses=this.classHost.join(" ");
        }
      }
      addContClasses(config:FieldConfig):void{
            if(this.classCont) {
              this.contClasses=this.classCont.join(" ");
            }
          }

      addElemClasses(config:FieldConfig):void{
        if(this.classElem) {
          this.elementClasses=this.classElem.join(" ");
        }
      }

      onChangesControl(changes:any){
        return this.fs.pushChanges(this.config,changes);
      }

}
