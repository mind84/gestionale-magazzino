import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import {CommunicationService} from '../../services/communication.service'
@Component({
  selector: 'app-text-search',
  templateUrl: './text-search.component.html',
  styleUrls: ['./text-search.component.css']
})
export class TextSearchComponent implements OnInit {

@Input("results") results:any;
@Input()
  public subsScriber:Function;
  @Input()
    public comm:any;
  constructor(private comServ:CommunicationService) {
  }

  ngOnInit() {

  }

setSearch(selectedArt:any){
  this.subsScriber(selectedArt);
  //this.comm();
  this.comServ.communicate()
}

}
