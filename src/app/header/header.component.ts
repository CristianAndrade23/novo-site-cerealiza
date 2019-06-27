import { Component, OnInit } from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  modalRefTesteGratis: BsModalRef;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }

  abreModalTesteGratis(modal){
    this.modalRefTesteGratis = this.modalService.show(modal);
  }

}
