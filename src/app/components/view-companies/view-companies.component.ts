import { Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
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

  companies : any[];
  selectedCompany : any;

  constructor(private router : Router,
    private dbService : DatabaseService,
    private validateService : ValidateService,
    private flashMessage : FlashMessagesService) { }

  ngOnInit() {
    this.dbService.getCompanies2().subscribe(data=>{
      this.companies=data[0];
    })
  }

  onClick(c){
    this.selectedCompany = c;
  }

  onSubmit(){

    let company = {
      idCompany : this.selectedCompany.idCompany,
      name : this.selectedCompany.Company,
      website : this.selectedCompany.Website
    }

    if(!this.validateService.validateCompany(company)){
      this.flashMessage.show("Please fill in all fields", {cssClass : 'alert-danger'})
      return false;
    }

    this.dbService.updateCompany(company).subscribe(data=>{
      if(data.success){
        this.flashMessage.show(data.msg, {cssClass : 'alert-success'})
        this.router.navigate(['clients'])
      }

      else{
        this.flashMessage.show(data.msg, {cssClass : 'alert-danger'})
        this.router.navigate(['clients'])
      }
    })

  }

}
