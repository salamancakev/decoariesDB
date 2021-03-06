import { Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgbTypeahead, NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FlashMessagesService } from 'angular2-flash-messages';
import { DatabaseService } from "../../services/database.service";
import { ValidateService } from "../../services/validate.service";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-view-companies',
  templateUrl: './view-companies.component.html',
  styleUrls: ['./view-companies.component.css']
})
export class ViewCompaniesComponent implements OnInit {

  columns = [];
  clientCol =['Name', 'Email', 'Gender', 'Status'];

  companies : any[];
  clients : any[];
  selectedCompany : any;

  company: any;
  website: any;

  editModalReference : any;
  clientsModalReference : any;
  deleteModalReference : any;

  confirm = false;
  email : any;

  user : any;
  adminPass : any;
  errorMsg: any;
  auth0 =false;

  constructor(private router : Router,
    private dbService : DatabaseService,
    private validateService : ValidateService,
    private authService : AuthService,
    private modalService : NgbModal,
    private flashMessage : FlashMessagesService) { }

  ngOnInit() {
    this.dbService.getCompanies2().subscribe(data=>{
      this.companies=data[0];
    })

    this.user=this.authService.user
      this.columns=['Company', 'Website', 'From'];

  }

  onClick(c, details){
    this.selectedCompany = c;
    this.editModalReference = this.modalService.open(details);
  }
  searchClients(c, clients){
    this.dbService.searchClientsCompany(c).subscribe(data=>{
      this.clients=data;
      this.clientsModalReference=this.modalService.open(clients, {size : 'lg'});
    })
  }

  clearFields(){
    this.company = null;
    this.website = null;
  }

  onConfirm(){
    this.confirm=true;
  }

  unconfirm(){
    this.confirm=false;
  }

  close(){
    this.confirm=false;
    this.editModalReference.close();
  }

  closeDelete(){
    
    this.auth0=false;
    this.errorMsg=null;
    this.adminPass=null;
    this.deleteModalReference.close();
  }

  confirmDelete(content){
    this.editModalReference.close()
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
    this.dbService.deleteCompany(this.selectedCompany).subscribe(data=>{
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

    let company = {
      idCompany : this.selectedCompany.idCompany,
      name : this.selectedCompany.Company,
      website : this.selectedCompany.Website
    }

    if(!this.validateService.validateCompany(company)){
      this.flashMessage.show("Please fill in all fields", {cssClass : 'alert-danger'})
      this.confirm=false;
      return false;
    }

    this.dbService.updateCompany(company).subscribe(data=>{
      if(data.success){
        this.editModalReference.close();
        this.flashMessage.show(data.msg, {cssClass : 'alert-success'})
        this.router.navigate(['clients'])
      }

      else{
        this.editModalReference.close();
        this.flashMessage.show(data.msg, {cssClass : 'alert-danger'})
        this.router.navigate(['clients'])
      }
    })

  }

}
