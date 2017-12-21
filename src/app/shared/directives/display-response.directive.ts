import { Directive, ElementRef, HostListener, Input, AfterViewInit, ApplicationRef, ComponentRef, OnDestroy, ViewContainerRef, ComponentFactoryResolver, OnChanges } from '@angular/core';
import {DisplayResponseComponent} from '../components/display-response.component'

@Directive({
  selector: '[displayResponse]',
  exportAs: 'displayResponse'
})
export class DisplayResponseDirective implements OnChanges {
  @Input('displayResponse') servRes:any;
  private appendChild:any;

  cmpRef:ComponentRef<any>;
  constructor(private resolver:ComponentFactoryResolver, private el:ViewContainerRef, private appRef:ApplicationRef) {
      this.appendChild = this.resolver.resolveComponentFactory(DisplayResponseComponent);

   }
   render():void {
     if(this.cmpRef) this.cmpRef.destroy();
     this.cmpRef = this.el.createComponent(this.appendChild);
     this.cmpRef.instance.response= this.servRes;
     setTimeout(()=>{this.cmpRef.destroy()},2000)
  }

  ngOnChanges():void {
    this.render()
  }
}
