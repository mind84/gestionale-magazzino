import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import {UmService} from '../services/um.service'
import * as _ from 'lodash';

@Component({
  selector: 'app-umisura',
  templateUrl: './umisura.component.html',
  styleUrls: ['./umisura.component.css']
})
export class UmisuraComponent implements OnInit {
  insertUMForm: FormGroup;
  searchForm: FormGroup;
  insertMode:boolean = false
  searchResults:any = [];
  notifyInsert:any;
  hasResponse:boolean = false;
  hasError:boolean=false;
  hasLoaded:boolean = false;
  um:any = [];
  mainReference:any=[]
  selectedSearchValue:any;
  selectedMainReference:any;
  constructor(private UMService:UmService, private _fb: FormBuilder,) { }

  ngOnInit() {
    //reperimento unità di misura disponibili
    this.UMService.getMainReference().subscribe((um) =>{
    this.UMService.umreference=um;
    this.selectedSearchValue=um[0]
    this.mainReference = _.filter(um, {class:"mainReference"})
    this.selectedMainReference = this.mainReference[0]
    this.um = um
    this.hasLoaded=true;

    this.insertUMForm = this._fb.group({
        nameref: ['', Validators.required ],
        umref: ['', Validators.required ],
        umrefsymb: ['', Validators.required ],
        umdesc: ['', Validators.required ],
        umsymb: ['', Validators.required ],
        conversione:['', Validators.required ]
      })


      this.searchForm = this._fb.group({
          umdesc: null,
          umsymb: null
        })
      })
  }
  toggleInsert():boolean {
    return this.insertMode = !this.insertMode
  }
  onChange(ev, form){
    if (ev.id)
      form.controls.umdesc.setValue(ev.umdescr);

  }

  onRefChange(ev, form){
    if (ev && ev.id) {
      form.controls.umref.setValue(ev.umdescr);
    form.controls.umref.setValue(ev.um);
    form.controls.umrefsymb.setValue(ev.umdescr);
  }
  }
  insert(form:FormGroup): any {
    console.log('submit')
    if(form.status == "INVALID") return;
    else return this.UMService.insert(form).subscribe((res:any)=>{
        if (res && res.msg=="OK") {
          this.hasError=false;
          form.reset();
        }
        else this.hasError=true;
        this.hasResponse=true;
        this.notifyInsert=res;
    })


  }
  search(form:FormGroup):any{
    this.insertMode = false;
    let code = form.controls.umsymb.value.id;
      if (!code) return;
      else return this.UMService.search(code).subscribe((res:any)=>{
        this.searchResults=res
      })
    }

}
