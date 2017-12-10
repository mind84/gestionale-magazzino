import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import {MaterialiService} from '../services/materiali.service'

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
  constructor(private matService:MaterialiService, private _fb: FormBuilder,) { }

  ngOnInit() {
    //init della form
    this.insertMaterialiForm = this._fb.group({
        code: ['', Validators.required ],
        name: ['', Validators.required ],
        fornitore: ['', Validators.required ],
        price: ['', Validators.required ],
        collobj:['', Validators.required ],
        note:''
      })

      this.searchForm = this._fb.group({
          code: null,
          name: null
        })
  }

  toggleInsert():boolean {
    return this.insertMode = !this.insertMode
  }

  insert(form:FormGroup): any {
    console.log('submit')
    if(form.status == "INVALID") return;
    else return this.matService.insert(form).subscribe((res:any)=>{
        if (res && res.msg=="OK") {
          this.hasError=false;
          form.reset();
        }
        else this.hasError=true;
        this.hasResponse=true;
        this.notifyInsert=res;
      console.log(res)
    })


  }
  search(form:FormGroup):any{
    this.insertMode = false;
    let code = form.controls.code.value;
    let name = form.controls.name.value;
      if (!code && !name) return;
      else return this.matService.search(code, name).subscribe((res:any)=>{
        this.searchResults=res
        console.log(res);
      })
    }
}
