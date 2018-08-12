import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private http : Http) { }

  registerClient(client){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/api/register-client', client, {headers :headers}).pipe(map(res=> res.json()));
  }

  getCompanies(){
    return this.http.get('/api/get-companies').pipe(map(res=> res.json()));
  }
  
  getCompanies2(){
    return this.http.get('/api/get-companies2').pipe(map(res=> res.json()));
  }

  getClients(){
    return this.http.get('/api/get-clients').pipe(map(res =>res.json()));
  }

  updateClient(client){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/api/update-client', client, {headers : headers}).pipe(map(res=>res.json()))
  }

  updateCompany(company){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/api/update-company', company, {headers : headers}).pipe(map(res=>res.json()))
  }

  getProducts(){
    return this.http.get('/api/get-products').pipe(map(res=>res.json()));
  }

  addOrder(order){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/api/add-order', order, {headers : headers}).pipe(map(res=>res.json()))
  }

  getOrders(){
    return this.http.get('/api/get-orders').pipe(map(res=>res.json()));
  }

  getOrderDetails(order){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/api/get-order-details', order, {headers : headers}).pipe(map(res=>res.json()));
  }

  updateOrder(order){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/api/update-order', order, {headers : headers}).pipe(map(res=>res.json()));
  }

  addProduct(product){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/api/add-product',product,{headers:headers}).pipe(map(res=>res.json()));
  }

  updateProduct(product){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/api/update-product',product, {headers:headers}).pipe(map(res=>res.json()));    
  }

  searchClientsCompany(company){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/api/clients-company', company, {headers :headers}).pipe(map(res=>res.json()));
  }

}
