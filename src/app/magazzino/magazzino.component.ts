import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import {MaterialiService} from '../services/materiali.service';
import {MagazzinoService} from '../services/magazzino.service';
import {Subject} from 'rxjs/Subject'
import {BehaviorSubject} from 'rxjs/BehaviorSubject'
import {Observable} from 'rxjs/Observable'
import 'rxjs/add/operator/pairwise'
import 'rxjs/add/operator/switchMap'


@Component({
  selector: 'app-magazzino',
  templateUrl: './magazzino.component.html',
  styleUrls: ['./magazzino.component.css'],
    providers: [MaterialiService, MagazzinoService]
})
export class MagazzinoComponent implements OnInit {
  searchForm: FormGroup;
  variationMode:boolean = true;
  currentArticle:any;
  setCodeForSearch:Subject<FormGroup> = new Subject<FormGroup>();
  //setCodeForSearch:BehaviorSubject<FormGroup> = new BehaviorSubject<FormGroup>(null);
  setCodeForSearch$:Observable<any> = this.setCodeForSearch.asObservable()
  public subsFunction:Function;
  public findFunction:Function;
  constructor(
    private matService:MaterialiService,
    private _fb: FormBuilder,
    private storeServ: MagazzinoService
  ) { }

  ngOnInit() {
    this.searchForm = this._fb.group({
        code: null,
        name: null,
        datfrom: null,
        datto: null
      })

      this.matService.currentSelectedArticle$.subscribe((art)=>{
        this.searchForm.controls.name.setValue(art.name);
        this.searchForm.controls.code.setValue(art.code);
        this.currentArticle = art;
      })

      this.setCodeForSearch$
      .pairwise()
      .filter((p)=>{
        return (p[0] !== p[1])
      }).switchMap((val:any)=>{
        return this.matService.search(val[1],null,null);
      }).subscribe(
        (v:any)=>{
          if (v && v.length) {
            this.searchForm.controls.name.setValue(v[0].name);
            this.currentArticle=v[0];
          }
        })
      this.subsFunction = this.matService.setCurrentFunc;
      this.findFunction = this.matService.findFunction;
      this.setCodeForSearch.next(this.searchForm.getRawValue().code)
  }

  toggleState(){
    return this.variationMode = !this.variationMode
  }
  search(form:FormGroup){
    if (!form.getRawValue().code) return;
    else this.setCodeForSearch.next(form.getRawValue().code)

  }

}
