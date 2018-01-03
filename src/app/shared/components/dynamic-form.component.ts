import { Component, OnInit, ElementRef, HostListener, Input, AfterViewInit, ComponentRef, OnDestroy, ViewContainerRef, ComponentFactoryResolver, OnChanges, Output,EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit {
  dynForm:FormGroup;
  @Output()
  parentNotification: EventEmitter<any> = new EventEmitter<any>();


  constructor(private fb: FormBuilder) { }

  ngOnInit() {
      this.createFormGroup()
  }

  createFormGroup(){
      this.dynForm = this.fb.group({})
      //creazione dinamica dei controlli in init
  }
}
