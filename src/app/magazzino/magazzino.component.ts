import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import {MaterialiService} from '../services/materiali.service'

@Component({
  selector: 'app-magazzino',
  templateUrl: './magazzino.component.html',
  styleUrls: ['./magazzino.component.css'],
    providers: [MaterialiService]
})
export class MagazzinoComponent implements OnInit {
  searchForm: FormGroup;
  constructor(
    private matService:MaterialiService,
    private _fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.searchForm = this._fb.group({
        code: null,
        name: null,
        datfrom: null,
        datto: null
      })
  }

}
