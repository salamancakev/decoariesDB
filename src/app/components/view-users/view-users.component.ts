import { Component, OnInit, ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import {NgbTypeahead, NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {Observable, Subject, merge} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';
import { FlashMessagesService } from 'angular2-flash-messages';
import { DatabaseService } from "../../services/database.service";
import { ValidateService } from "../../services/validate.service";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {

  columns = ['Name', 'Email', 'Type'];

  users : any[];
  selectedUser : any;
  modalReference :any;
  email : any;
  confirm = false;
  constructor(private router : Router,
    private dbService : DatabaseService,
    private validateService : ValidateService,
    private modalService : NgbModal,
    private flashMessage : FlashMessagesService,
    private authService : AuthService) { }

  ngOnInit() {
    this.dbService.getUsers().subscribe(data=>{
      this.users=data;
      console.log(this.users)
    })
    
  }


}
