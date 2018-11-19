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
  deleteModalReference : any;
  email : any;
  password : any;
  confirm = false; 
  adminPass : any;
  errorMsg: any;
  auth0 =false;
  newPass = false;
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

  onClick(user, content){
    this.selectedUser=user;
    this.modalReference=this.modalService.open(content);
  }

  close(){
    this.confirm=false;
    this.newPass=false;
    this.modalReference.close()
  }

  closeDelete(){
    this.adminPass=null;
    this.errorMsg=null;
    this.auth0=false;
    this.deleteModalReference.close();
  }

  onConfirm(){
    this.confirm=true;
  }
  
  unconfirm(){
    this.confirm=false;
  }

  confirmDelete(content){
    this.modalReference.close()
    this.deleteModalReference=this.modalService.open(content);
  }

  onNewPass(){
    this.newPass=true;
  }

  authDelete(){
    let user = {
      email : this.authService.user.Email,
      password : this.adminPass
    }
    this.authService.login(user).subscribe(data=>{
      if(data.error){
        this.errorMsg = data.msg;
        return false;
      }
  
      else{
        this.auth0=true;
        this.errorMsg = null;
      }
    })
  }

  onDelete(){

    let body = {
      clientToken : this.authService.clientToken,
      auth0 : this.selectedUser.Auth0,
      idUser : this.selectedUser.idUser
    }
    
    this.dbService.blockUser(body).subscribe(data=>{
      if(data.success){
        this.flashMessage.show(data.msg, {cssClass : 'alert-success'})
        this.deleteModalReference.close()
        this.router.navigate(['users'])
      }
  
      else{
        this.flashMessage.show("Something went wrong", {cssClass : 'alert-danger'})
        this.deleteModalReference.close()
        this.router.navigate(['users'])
      }
    })
  }


  onSubmit(){
  let user = {
    clientToken : this.authService.clientToken,
    idUser : this.selectedUser.idUser,
    name : this.selectedUser.Name,
    type : this.selectedUser.Type,
    email : this.selectedUser.Email,
    auth0 : this.selectedUser.Auth0,
    password : this.password
  }

  this.dbService.updateUser(user).subscribe(data=>{
    if(data.success){
      this.modalReference.close();
    this.flashMessage.show(data.msg, {cssClass : 'alert-success'})
    this.router.navigate(['users']);
    }

    else{
      this.modalReference.close();
    this.flashMessage.show(data.msg, {cssClass : 'alert-danger'})
    this.router.navigate(['users']);
    }
  })


  }



}
