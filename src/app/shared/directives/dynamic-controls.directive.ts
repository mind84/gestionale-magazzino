import {Injector, Directive,Type, HostListener,OnInit, Input, ComponentRef, OnDestroy, ViewContainerRef, ComponentFactoryResolver, OnChanges } from '@angular/core';
import {FormGroup} from '@angular/forms'
import {CommunicationService} from '../../services/communication.service'
import {FieldConfig} from '../interfaces/form-interface'
import {Field} from '../interfaces/form-interface';
import {FormService} from '../../services/form-service'
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

component: ComponentRef<any>;
  constructor(private resolver:ComponentFactoryResolver, private container: ViewContainerRef, private inj:Injector) {
 }

  ngOnInit() {
      if (!components[this.config.type]) {
        const supportedTypes = Object.keys(components).join(', ');
        throw new Error(
          `Trying to use an unsupported type (${this.config.type}).
          Supported types: ${supportedTypes}`
        );
      }
      const component = this.resolver.resolveComponentFactory<Field>(components[this.config.type]);
      this.component = this.container.createComponent(component,0,this.inj);
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
