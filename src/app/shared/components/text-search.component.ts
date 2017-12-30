import { Injector, Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import {CommunicationService} from '../../services/communication.service'
@Component({
  selector: 'app-text-search',
  templateUrl: './text-search.component.html',
  styleUrls: ['./text-search.component.css']
})
export class TextSearchComponent implements OnInit {
  comServ:any
@Input("results") results:any;
@Input()
  public subsScriber:any;
  @Input()
    public comm:any;
  constructor() {
}

  ngOnInit() {
  }

setSearch(selectedArt:any){
  this.subsScriber(selectedArt);
  this.comm();
}

}
