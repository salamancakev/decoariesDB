import { Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgbTypeahead, NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FlashMessagesService } from 'angular2-flash-messages';
import { DatabaseService } from "../../services/database.service";
import { ValidateService } from "../../services/validate.service";

@Component({
  selector: 'app-view-companies',
  templateUrl: './view-companies.component.html',
  styleUrls: ['./view-companies.component.css']
})
export class ViewCompaniesComponent implements OnInit {

  columns = ['Company', 'Website'];
  clientCol =['Name', 'Email', 'Gender', 'Status'];

  companies : any[];
  clients : any[];
  selectedCompany : any;

  editModalReference : any;
  clientsModalReference : any;

  confirm = false;

  constructor(private router : Router,
    private dbService : DatabaseService,
    private validateService : ValidateService,
    private modalService : NgbModal,
    private flashMessage : FlashMessagesService) { }

  ngOnInit() {
    this.dbService.getCompanies2().subscribe(data=>{
      this.companies=data[0];
    })
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

  onConfirm(){
    this.confirm=true;
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
