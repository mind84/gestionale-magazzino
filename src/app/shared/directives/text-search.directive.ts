import { Directive, ElementRef,ComponentFactory, HostListener,OnInit, Input, AfterViewInit, SimpleChanges, ComponentRef, OnDestroy, ViewContainerRef, ComponentFactoryResolver, OnChanges } from '@angular/core';
import {TextSearchComponent} from '../components/text-search.component';
import {Observable} from 'rxjs/Observable'
import {CommunicationService} from '../../services/communication.service'
import {TextSearchInterface} from '../interfaces/form-interface'
import 'rxjs/add/observable/fromEvent'
import 'rxjs/add/operator/debounceTime'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/switchMap'

@Directive({
  selector: '[textSearch]',
  exportAs: 'textSearch',
  providers:[CommunicationService]
})
export class TextSearchDirective implements OnInit {
  @Input('textSearch') search:string;

  @Input()
    searchConfiguration:TextSearchInterface;

  appendTempl:ComponentFactory<TextSearchComponent>;

  cmpRef:ComponentRef<TextSearchComponent>;

  keyUpEvent: Observable<any> = Observable.fromEvent(this.elem.nativeElement, 'keyup');

  constructor(
    private resolver:ComponentFactoryResolver,
    private el:ViewContainerRef,
    private elem:ElementRef,
    private comServ:CommunicationService,
  ) {
    this.appendTempl = this.resolver.resolveComponentFactory(TextSearchComponent);
   }

   ngOnInit(){
     if(!this.searchConfiguration) return;

     this.keyUpEvent.debounceTime(200).switchMap((ev)=>{
       if (ev.target.value) return this.searchConfiguration.searchFunction(ev.target.value);
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
     this.cmpRef.instance.subsScriber = this.searchConfiguration.subsFunction;
     this.cmpRef.instance.comm = this.comServ.doCom;
     }
     if(res && res.length) this.cmpRef.instance.results= res;
   }

   destroy(){
     if (this.cmpRef && !this.cmpRef.hostView.destroyed) this.cmpRef.destroy();
   }


}
