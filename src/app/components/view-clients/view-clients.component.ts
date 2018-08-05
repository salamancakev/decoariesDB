import { Component, OnInit, ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import {Observable, Subject, merge} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';
import { FlashMessagesService } from 'angular2-flash-messages';
import { DatabaseService } from "../../services/database.service";
import { ValidateService } from "../../services/validate.service";
@Component({
  selector: 'app-view-clients',
  templateUrl: './view-clients.component.html',
  styleUrls: ['./view-clients.component.css']
})
export class ViewClientsComponent implements OnInit {

  columns = ['Name', 'Gender', 'Email', 'Status', 'Company', 'Website', 'Register Date', 'Phone1', 'Phone2'];

  clients : any[];
  selectedClient : any;
  companyNames:  any[];

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
  private flashMessage : FlashMessagesService) { }

  ngOnInit() {

    this.dbService.getClients().subscribe(data=>{
      this.clients=data[0] 
  })

  let names = [];
  let companies = [];
    this.dbService.getCompanies().subscribe(data=>{
      console.log(data);
      companies = data;
      companies.forEach(function(value){
        console.log(value)
        names.push(value.CompanyName)
      })
      this.companyNames = names;
    })
}

onClick(client){
  this.selectedClient=client;
  console.log(this.selectedClient);
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
    phone1 : this.selectedClient.Phone1,
    phone2 : this.selectedClient.Phone2,
    companyName : this.selectedClient.Company,
    exists : exists
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
    this.flashMessage.show(data.msg, {cssClass : 'alert-success'})
    this.router.navigate(['clients']);
  }

  else{
    this.flashMessage.show(data.msg, {cssClass : 'alert-danger'})
    this.router.navigate(['clients']);
  }
})

}

}

