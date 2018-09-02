import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from "../../services/auth.service";
import { FlashMessagesService } from 'angular2-flash-messages';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
  email : any;
  password : any;
  constructor(private authService : AuthService,
              private flashMessage : FlashMessagesService,
              private router : Router) { }

  ngOnInit() {
    this.authService.getClientToken().subscribe(data=>{
      this.authService.clientToken=data.access_token;
    })
  }


  onLogin(){
    let user={
      email : this.email,
      password : this.password
    }
  this.authService.login(user).subscribe(data=>{
    if(data.error){
      this.flashMessage.show(data.msg, {cssClass : 'alert-danger'});
      return false;
    }

    else{
      this.authService.userToken=data.userToken;
      this.authService.user=data.user;
      this.flashMessage.show('Welcome '+data.user.Name, {cssClass:'alert-success'});
      this.router.navigate(['home']);
    }
  })
  }


  

}
