import { ReflectiveInjector, Injector,Directive, ElementRef, HostListener,OnInit, Input, AfterViewInit, SimpleChanges, ComponentRef, OnDestroy, ViewContainerRef, ComponentFactoryResolver, OnChanges } from '@angular/core';
import {TextSearchComponent} from '../components/text-search.component';
import {Observable} from 'rxjs/Observable'
import {CommunicationService} from '../../services/communication.service'
import 'rxjs/add/observable/fromEvent'
import 'rxjs/add/operator/debounceTime'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/switchMap'

@Directive({
  selector: '[textSearch]',
  exportAs: 'textSearch',
  providers:[CommunicationService]
})
export class TextSearchDirective implements OnInit,OnChanges {
  @Input('textSearch') search:any;
  @Input('execFunction') execFunction:Function;
  @Input()
    public subsRes:Function;
  appendTempl:any;
  cmpRef:ComponentRef<any>;
  keyUpEvent: Observable<any> = Observable.fromEvent(this.elem.nativeElement, 'keyup');
  constructor(
    private resolver:ComponentFactoryResolver,
    private el:ViewContainerRef,
    private elem:ElementRef,
    private comServ:CommunicationService,
    private injector: Injector
  ) {
    this.appendTempl = this.resolver.resolveComponentFactory(TextSearchComponent);
   }
   ngOnInit(){
     this.keyUpEvent.debounceTime(200).switchMap((ev)=>{
       if (ev.target.value) return this.execFunction(ev.target.value);
       else return Observable.of(null);
     }).subscribe((val)=>{
       if (val) {
         this.render(val)
       }
       else this.destroy()
     })
     this.comServ.getCom$.subscribe((val=>{
       this.cmpRef.destroy()
     }))
   }
   render(res:any):void {
     if(!this.cmpRef || this.cmpRef.hostView.destroyed){
     this.cmpRef = this.el.createComponent(this.appendTempl);
     this.cmpRef.instance.subsScriber = this.subsRes;
     this.cmpRef.instance.comm = this.comServ.doCom;
     }
     if(res) this.cmpRef.instance.results= res;
   }
   destroy(){
     if (this.cmpRef && !this.cmpRef.hostView.destroyed) this.cmpRef.destroy();
   }
 ngOnChanges(changes:SimpleChanges){

 }
}
