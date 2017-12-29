import { Directive, ElementRef, HostListener, Input, AfterViewInit, SimpleChanges, ComponentRef, OnDestroy, ViewContainerRef, ComponentFactoryResolver, OnChanges } from '@angular/core';
import {TextSearchComponent} from '../components/text-search.component'


@Directive({
  selector: '[textSearch]',
  exportAs: 'textSearch'
})
export class TextSearchDirective implements OnChanges {
  @Input('textSearch') search:any;
  appendTempl:any;
  cmpRef:ComponentRef<any>;
  constructor(private resolver:ComponentFactoryResolver, private el:ViewContainerRef) {
    this.appendTempl = this.resolver.resolveComponentFactory(TextSearchComponent);
   }

   render():void {
     if(!this.cmpRef){
     this.cmpRef = this.el.createComponent(this.appendTempl);
     this.cmpRef.instance.toSearch= this.search;
     }
     else this.cmpRef.instance.toSearch=this.search
   }
 ngOnChanges(changes:SimpleChanges){
   console.log(changes);
   this.render()

 }
}
