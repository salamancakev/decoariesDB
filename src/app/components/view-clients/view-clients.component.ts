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
  selector: 'app-view-clients',
  templateUrl: './view-clients.component.html',
  styleUrls: ['./view-clients.component.css']
})
export class ViewClientsComponent implements OnInit {

  columns = [];

  clients : any[];
  selectedClient : any;
  companyNames:  any[];
  phone : String;
  phones=[];
  modalReference :any;
  email : any;
  confirm = false;

  deleteModalReference : any;

  user : any;
  adminPass : any;
  errorMsg: any;
  auth0 =false;

  @ViewChild('instance') instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  search = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.companyNames
        : this.companyNames.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }

  constructor(private router : Router,
  private dbService : DatabaseService,
  private validateService : ValidateService,
  private modalService : NgbModal,
  private flashMessage : FlashMessagesService,
  private authService : AuthService) { }

  ngOnInit() {

    this.dbService.getClients().subscribe(data=>{
      this.clients=data[0] 
  })

  let names = [];
  let companies = [];
    this.dbService.getCompanies().subscribe(data=>{
      companies = data;
      companies.forEach(function(value){
        names.push(value.Name)
      })
      this.companyNames = names;
    })
    this.user=this.authService.user;

    if(this.user.Type == 'Admin'){
      this.columns=['Name', 'Gender', 'Email', 'Status', 'Company', 'Website', 'createdBy'];
    }

    else{
      this.columns=['Name', 'Gender', 'Email', 'Status', 'Company', 'Website'];
    }

}

onClick(client, content){
  this.selectedClient=client;
  this.dbService.getPhones(client).subscribe(data=>{
    data.forEach(value=>{
      this.phones.push(value.PhoneNumber)
    })
  })
  console.log(this.phones);
  this.modalReference=this.modalService.open(content);
}

onAdd(){
  this.phones.push(this.phone)
  this.phone=null
}

onDeletePhone(phone){
  let index = this.phones.indexOf(phone)
  let array;
  if(index>-1){
   array= this.phones.splice(index, 1)
  }

  console.log(array)
}

close(){
  this.phones=[];
  this.confirm=false;
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

confirmDelete(client, content){
  this.selectedClient=client;
  this.deleteModalReference=this.modalService.open(content);
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
  this.dbService.deleteClient(this.selectedClient).subscribe(data=>{
    if(data.success){
      this.flashMessage.show(data.msg, {cssClass : 'alert-success'})
      this.deleteModalReference.close()
      this.router.navigate(['clients'])
    }

    else{
      this.flashMessage.show("Something went wrong", {cssClass : 'alert-danger'})
      this.deleteModalReference.close()
      this.router.navigate(['clients'])
    }
  })
}

onSubmit(){
let exists;
  if(this.companyNames.includes(this.selectedClient.Company)){
    exists=true;
  }

  let client = {
    idClient : this.selectedClient.idClient,
    name : this.selectedClient.Name,
    email : this.selectedClient.Email,
    gender : this.selectedClient.Gender,
    status : this.selectedClient.Status,
    phones : this.phones,
    companyName : this.selectedClient.Company,
    companyWebsite : this.selectedClient.Website,
    exists : exists,
    idUser : this.user.idUser
  }

  if(!this.validateService.validateClientRegister(client)){
    this.flashMessage.show('Please fill in all fields', {cssClass : 'alert-danger'})
    return false;
  }

  if(!this.validateService.validateEmail(client.email)){
    this.flashMessage.show('Please enter a valid email address', {cssClass: 'alert-danger'})
    return false;
  }

this.dbService.updateClient(client).subscribe(data =>{
  if(data.success){
    this.modalReference.close();
    this.flashMessage.show(data.msg, {cssClass : 'alert-success'})
    this.router.navigate(['clients']);
  }

  else{
    this.modalReference.close();
    this.flashMessage.show(data.msg, {cssClass : 'alert-danger'})
    this.router.navigate(['clients']);
  }
})

}

}

