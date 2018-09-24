import { Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {DatePipe, formatDate} from "@angular/common";
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import {Observable, Subject, merge} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';
import { FlashMessagesService } from 'angular2-flash-messages';
import {ValidateService} from '../../services/validate.service';
import {DatabaseService} from '../../services/database.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
    idUser : any;
    companies :any[];
    clients : any[];
    companyNames: any[];
    name : String;
    email : String;
    gender : String;
    phones = [];
    company : String;
    website : String;
    date : Date;
    selectedPhone : String;

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
  private flashMessage : FlashMessagesService,
  private authService : AuthService) { }

  ngOnInit() {
    let names = [];
    this.dbService.getCompanies().subscribe(data=>{
      this.companies = data;
      this.companies.forEach(function(value){
        names.push(value.Name)
      })
      this.companyNames = names;
    });

    this.dbService.getClients().subscribe(data2=>{
      this.clients=data2[0]
      console.log(this.clients)
    })
    
    this.idUser=this.authService.user.idUser;
    console.log(this.phones.length)
  }

  onAddPhone(){
    if(this.selectedPhone==undefined){
      this.flashMessage.show('Please enter a phone number', {cssClasS: 'alert-danger'})
      return false
    }

    this.phones.push(this.selectedPhone);
    this.selectedPhone=null;

  }

  Test(){
    console.log(this.idUser)
  }

  onSubmit(){
    try{
this.date = new Date();
      let registerDate=formatDate(this.date,  'yyyy-MM-dd HH:mm:ss', 'en-us','-0400');
      let exists=false;
      if(this.companyNames.includes(this.company)){
        exists=true;
      }
    

    const client = {
      name : this.name,
      email : this.email,
      gender : this.gender,
      status : 'Active',
      phones : this.phones,
      companyName : this.company,
      companyWebsite : this.website,
      date : registerDate,
      exists : exists,
      idUser : this.idUser
    }

    if(!this.validateService.validateClientRegister(client)){
      this.flashMessage.show('Please fill in all fields', {cssClass: "alert-danger"});
      return false;
    }

    if(!this.validateService.validateEmail(client.email)){
      this.flashMessage.show('Please enter a valid email address', {cssClass : "alert-danger"});
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
    catch(e){
      console.log(e)
    }
      

  }

}
