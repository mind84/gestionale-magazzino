import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-display-response',
  templateUrl: './display-response.component.html',
  styleUrls: ['./display-response.component.css']
})
export class DisplayResponseComponent implements OnInit {
@Input("response") response:any;
hasError:boolean = false
  constructor() { }

  ngOnInit() {
    if (this.response && this.response.msg !=="OK") {
      this.hasError=true;
  }
}
}
