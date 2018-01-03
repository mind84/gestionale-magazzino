import { ReflectiveInjector, Injector,Directive, ElementRef, HostListener,OnInit, Input, AfterViewInit, SimpleChanges, ComponentRef, OnDestroy, ViewContainerRef, ComponentFactoryResolver, OnChanges } from '@angular/core';
import {TextSearchComponent} from '../components/text-search.component';
import {Observable} from 'rxjs/Observable'
import {CommunicationService} from '../../services/communication.service'
import 'rxjs/add/observable/fromEvent'
import 'rxjs/add/operator/debounceTime'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/switchMap'

@Directive({
  selector: '[appDynamicControls]',
  exportAs:'appDynamicControls'
})
export class DynamicControlsDirective {
_conf:any;
@Input() set appDynamicControls(conf:any) {
  if(conf) {
    this._conf=conf;
    this.setFields(conf)
  }

}
  constructor() { }
  setFields(conf:any):void{
console.log("intercettata configurazione", conf)

  }
}
