import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers } from "@angular/http";
import { map } from '../../../node_modules/rxjs/operators';
import { ok } from 'assert';


(window as any).global = window;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  clientToken : any;
  userToken : any;
  user : any;

  constructor(private http : Http) { }

  getClientToken(){
    let body = {
     grant_type : 'client_credentials',
     client_id : 'phpxbP6A0vfUur3isYoKi8E6dicA33IM',
     client_secret : 'A5_dh9O8vxfIeeRupZXl6GafwsDbjpuoT2XXKPi6brSR5p_YN6BAb4Chev7TZ6Rh',
     audience : 'https://decoaries.auth0.com/api/v2/'
     
    }

    let headers = new Headers();

    headers.append('Content-Type', 'application/json');

    return this.http.post('https://decoaries.auth0.com/oauth/token', body, {headers : headers}).pipe(map(res=>res.json()));

  }


  login(user){
    let body = {
      clientToken : this.clientToken,
      email : user.email,
      password : user.password
    }
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8080/api/login', body, {headers : headers}).pipe(map(res=>res.json()));
  }

  signup(user){

    let body = {
      clientToken : this.clientToken,
      email : user.email,
      password : user.password,
      name : user.name,
      type : user.type,
      date : user.date
    }

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer '+this.userToken)

    return this.http.post('http://localhost:8080/api/signup',body, {headers : headers}).pipe(map(res=>res.json()));

  }
 

}
