import { Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {DatePipe} from "@angular/common";
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import {Observable, Subject, merge} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';
import { FlashMessagesService } from 'angular2-flash-messages';
import {ValidateService} from '../../services/validate.service';
import {DatabaseService} from '../../services/database.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

    companies :any[];
    clients : any[];
    companyNames: any[];
    name : String;
    email : String;
    gender : String;
    phone1 : String;
    phone2 : String;
    company : String;
    website : String;
    date : Date;

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

  constructor(private validateService : ValidateService,
  private dbService : DatabaseService,
  private router : Router,
  private datePipe : DatePipe,
  private flashMessage : FlashMessagesService) { }

  ngOnInit() {
    let names = [];
    this.dbService.getCompanies().subscribe(data=>{
      console.log(data);
      this.companies = data;
      this.companies.forEach(function(value){
        console.log(value)
        names.push(value.CompanyName)
      })
      this.companyNames = names;
    });

    this.dbService.getClients().subscribe(data=>{
      this.clients=data;
    })
  }


  onSubmit(){
      this.date = new Date();
      let registerDate=this.datePipe.transform(this.date, 'yyyy-MM-dd');
      let exists=false;
      if(this.companyNames.includes(this.company)){
        exists=true;
      }

    const client = {
      name : this.name,
      email : this.email,
      gender : this.gender,
      status : 'Active',
      phone1 : this.phone1,
      phone2 : this.phone2,
      companyName : this.company,
      companyWebsite : this.website,
      registerDate : registerDate,
      exists : exists
    }

    if(!this.validateService.validateClientRegister(client)){
      this.flashMessage.show('Please fill in all fields', {cssClass: "alert-danger"});
      return false;
    }

    if(!this.validateService.validateEmail(client.email)){
      this.flashMessage.show('Please enter a valid email address', {cssClass : "alert-danger"});
      return false;
    }

    if(!this.validateService.validateWebsite(client)){
      this.flashMessage.show('Please fill in the Website field.', {cssClass : 'alert-danger'})
      return false;
    }

    this.clients.forEach(value=>{
      if(value.Name == client.name || value.Email == client.email){
        this.flashMessage.show("Client already exists in database", {cssClass : 'alert-danger'})
        return false;
      }
    })

    this.dbService.registerClient(client).subscribe(data=>{
      if(data.success){
        this.flashMessage.show('Client added to DB', {cssClass : "alert-success"});
        this.router.navigate(['clients']);
      }
      else{
        this.flashMessage.show('Client already exists in database', {cssClass : "alert-danger"});
        return false;
      }
    })

  }

}
