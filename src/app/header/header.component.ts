import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public siteTitle:string = 'Gestionale Magazzino';
  public subTitle:string = '';

  constructor() { }

  ngOnInit() {
  }

}
