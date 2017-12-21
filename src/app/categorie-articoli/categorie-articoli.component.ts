import { Component, OnInit } from '@angular/core';
import {CategorieArticoliService} from '../services/categorie-articoli.service'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import * as _ from 'lodash';
@Component({
  selector: 'app-categorie-articoli',
  templateUrl: './categorie-articoli.component.html',
  styleUrls: ['./categorie-articoli.component.css']
})
export class CategorieArticoliComponent implements OnInit {
  insertCatForm: FormGroup;
  searchForm: FormGroup;
  insertMode:boolean = false
  searchResults:any = [];
  notifyInsert:any;
  hasResponse:boolean = false;
  isUpdating:any = {};
  hasError:boolean=false;
  constructor(private catArtService:CategorieArticoliService, private _fb: FormBuilder,) { }

  ngOnInit() {

    this.insertCatForm = this._fb.group({
        name: ['', Validators.required ],
        descr: ['', Validators.required ]
      })

      this.searchForm = this._fb.group({
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
    else return this.catArtService.insert(form).subscribe((res:any)=>{
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
    let name = form.controls.name.value;
      if (!name) return;
      else return this.catArtService.search(name).subscribe((res:any)=>{
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
