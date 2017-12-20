import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import {MaterialiService} from '../services/materiali.service'
import {UmService} from '../services/um.service'
import * as _ from 'lodash';

@Component({
  selector: 'app-materiali',
  templateUrl: './materiali.component.html',
  styleUrls: ['./materiali.component.css'],
  providers: [MaterialiService]
})
export class MaterialiComponent implements OnInit {
  insertMaterialiForm: FormGroup;
  searchForm: FormGroup;
  insertMode:boolean = false
  searchResults:any = [];
  notifyInsert:any;
  hasResponse:boolean = false;
  hasError:boolean=false;
  isUpdating:any = {};
  um:any
  selectedSearchValue:any;

  constructor(private matService:MaterialiService, private _fb: FormBuilder, private UMService:UmService) { }

  ngOnInit() {
    this.UMService.getMainReference().subscribe((um) =>{
      this.um=um;
      this.UMService.umreference=um;
      this.selectedSearchValue=um[0]
      this.insertMaterialiForm = this._fb.group({
          code: ['', Validators.required ],
          name: ['', Validators.required ],
          fornitore: ['', Validators.required ],
          qta: ['', Validators.required],
          umId: ['', Validators.required],
          price: ['', Validators.required ],
          collobj:['', Validators.required ],
          note:''
        })
    })
      this.searchForm = this._fb.group({
          code: null,
          name: null
        })
  }

  toggleInsert():boolean {
    return this.insertMode = !this.insertMode
  }
  toggleUpdating(index):any {
    if(!(index in this.isUpdating)) this.isUpdating[index]=false
    return this.isUpdating[index] = !this.isUpdating[index]
  }

  insert(form:FormGroup): any {
    if(form.status == "INVALID") return;
    else return this.matService.insert(form).subscribe((res:any)=>{
        if (res && res.msg=="OK") {
          this.hasError=false;
          form.reset();
        }
        else this.hasError=true;
        this.hasResponse=true;
        this.notifyInsert=res;
        setTimeout(()=>{this.hasResponse=false},1000)
    })


  }
  search(form:FormGroup):any{
    this.insertMode = false;
    let code = form.controls.code.value;
    let name = form.controls.name.value;
      if (!code && !name) return;
      else return this.matService.search(code, name).subscribe((res:any)=>{
        this.searchResults=res
      })
    }

  updateSearchResults(ev:any){
    let index = _.findIndex(this.searchResults, {_id: ev[0]._id})
    if (index>-1) {
      this.searchResults.splice(index, 1, ev[0])
      this.isUpdating[ev[1]]=false;
    }
    else return;
  }
}
