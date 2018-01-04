import { ReflectiveInjector, Injector,Directive, ElementRef,Type, HostListener,OnInit, Input, AfterViewInit, SimpleChanges, ComponentRef, OnDestroy, ViewContainerRef, ComponentFactoryResolver, OnChanges } from '@angular/core';
import {FormGroup} from '@angular/forms'
import {TextSearchComponent} from '../components/text-search.component';
import {Observable} from 'rxjs/Observable'
import {CommunicationService} from '../../services/communication.service'
import {FieldConfig} from '../interfaces/form-interface'
import {Field} from '../interfaces/form-interface';
import 'rxjs/add/observable/fromEvent'
import 'rxjs/add/operator/debounceTime'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/switchMap'

import {FormInputComponent} from '../components/controls/form-input.component'
import {FormSelectComponent} from '../components/controls/form-select.component'
import {FormButtonComponent} from '../components/controls/form-button.component'

const components: {[type: string]: Type<Field>} = {
  button: FormButtonComponent,
  input: FormInputComponent,
  select: FormSelectComponent
};

@Directive({
  selector: '[appDynamicControls]',
  exportAs:'appDynamicControls'
})
export class DynamicControlsDirective implements OnInit, OnChanges {

@Input()
config:FieldConfig;

@Input()
form:FormGroup;

component: ComponentRef<Field>;
  constructor(private resolver:ComponentFactoryResolver, private container: ViewContainerRef) {
  console.log("intercettata configurazione")
 }
  //setFields(conf:any):void{
  ngOnInit() {
      if (!components[this.config.type]) {
        const supportedTypes = Object.keys(components).join(', ');
        throw new Error(
          `Trying to use an unsupported type (${this.config.type}).
          Supported types: ${supportedTypes}`
        );
      }
      const component = this.resolver.resolveComponentFactory<Field>(components[this.config.type]);
      this.component = this.container.createComponent(component);
      this.component.instance.config = this.config;
      this.component.instance.group = this.form;
    }
    ngOnChanges(){
      if(this.component){
        this.component.instance.config = this.config;
        this.component.instance.group = this.form;
      }
    }
  }


  //}
