import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-text-search',
  templateUrl: './text-search.component.html',
  styleUrls: ['./text-search.component.css']
})
export class TextSearchComponent implements OnInit {
@Input("toSearch") toSearch:any;
  constructor() { }

  ngOnInit() {
  }

}
