import {Injector,Directive, ElementRef,ComponentFactory, HostListener,OnInit, Input, AfterViewInit, SimpleChanges, ComponentRef, OnDestroy, ViewContainerRef, ComponentFactoryResolver, OnChanges } from '@angular/core';
import {TextSearchComponent} from '../components/text-search.component';
import {FormGroup, AbstractControl} from '@angular/forms'
import {Observable} from 'rxjs/Observable'
import {CommunicationService} from '../../services/communication.service'
import {TextSearchInterface, FormChanges} from '../interfaces/form-interface'
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
    searchFunction:Function;

  @Input()
    formControlName:string;

  @Input()
    changeSubs:Function
  appendTempl:ComponentFactory<TextSearchComponent>;

  cmpRef:ComponentRef<TextSearchComponent>;

  keyUpEvent: Observable<any> = Observable.fromEvent(this.elem.nativeElement, 'keyup');

  constructor(
    private resolver:ComponentFactoryResolver,
    private el:ViewContainerRef,
    private elem:ElementRef,
    private comServ:CommunicationService,
    private inj:Injector
  ) {
    this.appendTempl = this.resolver.resolveComponentFactory(TextSearchComponent);
   }

   ngOnInit(){
     if(!this.searchFunction) return;
     this.keyUpEvent.debounceTime(200).switchMap((ev)=>{
       if (ev.target.value) return this.searchFunction(ev.target.value);
       else return Observable.of(null);
     }).subscribe((val)=>{
       if (val) {
         this.render(val)
       }
       else this.destroy()
     })
     this.comServ.getCom$.subscribe((val:any)=>{
       if(val) {
         let changes:FormChanges={
           formControlName:this.formControlName,
           valueToUpdate:val[this.formControlName],
           fromService:val
         }
         this.changeSubs(changes);
         this.cmpRef.destroy()
       }
     })
   }

   render(res:any):void {
     if(!this.cmpRef || this.cmpRef.hostView.destroyed){
     this.cmpRef = this.el.createComponent(this.appendTempl,0,this.inj);
     }
     if(res && res.length) this.cmpRef.instance.results= res;
   }

   destroy(){
     if (this.cmpRef && !this.cmpRef.hostView.destroyed) this.cmpRef.destroy();
   }


}
