import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import {MaterialiService} from '../services/materiali.service'
import {CategorieArticoliService} from '../services/categorie-articoli.service'

import {UmService} from '../services/um.service'
import {Subject} from 'rxjs/Subject'
import 'rxjs/add/operator/distinctUntilChanged'
import 'rxjs/add/operator/debounceTime'
import 'rxjs/add/operator/filter'
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
  searchCat$: Subject<string> = new Subject<string>()
  searchCat$Search: Subject<string> = new Subject<string>()
  prevCat:any;
  isSearchingCat:boolean;
  catcode:number = null;
  catName:string = "";
  prevCatSearch:any;
  isSearchingCatSearch:boolean;
  catcodeSearch:number = null;
  catNameSearch:string = "";

  constructor(
    private matService:MaterialiService,
    private _fb: FormBuilder,
    private UMService:UmService,
    private catArtServ:CategorieArticoliService
   ) { }

  ngOnInit() {
    this.UMService.getMainReference().subscribe((um) =>{
      this.um=um;
      this.UMService.umreference=um;
      this.selectedSearchValue=um[0]
      this.insertMaterialiForm = this._fb.group({
          code: ['', Validators.required ],
          name: ['', Validators.required ],
          categname: ['', Validators.required ],
          categ:[''],
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
          name: null,
          categ: null,
          categname: null
        })

    this.searchCat$
      .debounceTime(100)
      .distinctUntilChanged()
      .subscribe((term:string)=>{
        if (term.length <3) this.isSearchingCat = false;
        else {
          return this.catArtServ.search(term).subscribe((categories:any)=>{
            if (categories.length) this.isSearchingCat=true;
            this.prevCat = categories;
          })
        }
      })
      this.searchCat$Search
        .debounceTime(100)
        .distinctUntilChanged()
        .subscribe((term:string)=>{
          if (term.length <3) {
            this.isSearchingCatSearch = false;
            this.catcodeSearch=null;
          }
          else {
            return this.catArtServ.search(term).subscribe((categories:any)=>{
              if (categories.length) this.isSearchingCatSearch=true;
              this.prevCatSearch = categories;
            })
          }
        })
  }
  setCurrentCat(cat:any){
    this.isSearchingCat=false;
    this.catName = cat.name;
    this.catcode= cat.id;
  }
  setCurrentCatSearch(cat:any){
    this.isSearchingCatSearch=false;
    this.catNameSearch = cat.name;
    this.catcodeSearch= cat.id;
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
    let categ = form.controls.categ.value;
      if (!code && !name && !categ) return;
      else return this.matService.search(code, name, categ).subscribe((res:any)=>{
        //elaborare la risposta con lodash
        _.forEach(res, (v,k)=>{
          if (v.catdet.length) v.categname = v.catdet[0].name
      })
        this.searchResults=res
      })
    }

  updateSearchResults(ev:any){
    let index = _.findIndex(this.searchResults, {_id: ev[0]._id})
    if (index>-1) {
      //è stata modificata la categoria?
      ev[0].categname = ev[0].catdet[0].name;
      this.searchResults.splice(index, 1, ev[0])
      this.isUpdating[ev[1]]=false;
    }
    else return;
  }
}
