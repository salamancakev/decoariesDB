import { Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {DatePipe, formatDate} from "@angular/common";
import { FlashMessagesService } from 'angular2-flash-messages';
import {ValidateService} from '../../services/validate.service';
import {DatabaseService} from '../../services/database.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private validateService : ValidateService,
    private dbService : DatabaseService,
    private router : Router,
    private datePipe : DatePipe,
    private flashMessage : FlashMessagesService,
    private authService : AuthService) { }

    email : String;
    password : String;
    name : String;
    type : String;
    date : Date;

  ngOnInit() {
  }


  onSignUp(){ 
    this.date = new Date();
    let registerDate=formatDate(this.date,  'yyyy-MM-dd HH:mm:ss', 'en-us','-0400');
    let user = {
      email : this.email,
      password : this.password,
      name  : this.name,
      type : this.type,
      date : registerDate
    }

    this.authService.signup(user).subscribe(data=>{
      if(data.error){
        this.flashMessage.show(data.msg, {cssClass : 'alert-danger'});
        return false;
      }

      else{
        this.flashMessage.show('User has been created and can now login with its credentials', {cssClass : 'alert-success'});
        this.router.navigate(['users']);
      }
    })

  }


}
