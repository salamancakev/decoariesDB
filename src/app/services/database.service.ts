import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";
import {map} from 'rxjs/operators'
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private http : Http, private authService :AuthService) { }

  registerClient(client){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer '+this.authService.userToken);
    return this.http.post('/api/register-client', client, {headers :headers}).pipe(map(res=> res.json()));
  }

  getCompanies(){
    return this.http.get('/api/get-companies',).pipe(map(res=> res.json()));
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
    headers.append('Authorization', 'Bearer '+this.authService.userToken);
    return this.http.post('/api/update-client', client, {headers : headers}).pipe(map(res=>res.json()))
  }

  deleteClient(client){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer '+this.authService.userToken);
    return this.http.post('/api/delete-client', client, {headers : headers}).pipe(map(res=>res.json())) 
  }

  updateCompany(company){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer '+this.authService.userToken);
    return this.http.post('/api/update-company', company, {headers : headers}).pipe(map(res=>res.json()))
  }

  deleteCompany(company){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer '+this.authService.userToken);
    return this.http.post('/api/delete-company', company, {headers : headers}).pipe(map(res=>res.json()))
  }

  getProducts(){
    return this.http.get('/api/get-products').pipe(map(res=>res.json()));
  }

  addOrder(order){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer '+this.authService.userToken);
    return this.http.post('/api/add-order', order, {headers : headers}).pipe(map(res=>res.json()))
  }

  getOrders(){
    return this.http.get('/api/get-orders').pipe(map(res=>res.json()));
  }
  
  getDeletedOrders(){
    return this.http.get('/api/deleted-orders').pipe(map(res=>res.json()));
  }

  getOrderDetails(order){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer '+this.authService.userToken);
    return this.http.post('/api/get-order-details', order, {headers : headers}).pipe(map(res=>res.json()));
  }

  updateOrder(order){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer '+this.authService.userToken);
    return this.http.post('/api/update-order', order, {headers : headers}).pipe(map(res=>res.json()));
  }

  deleteOrder(order){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer '+this.authService.userToken);
    return this.http.post('/api/delete-order', order, {headers : headers}).pipe(map(res=>res.json()));
  }

  addProduct(product){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer '+this.authService.userToken);
    return this.http.post('/api/add-product',product,{headers:headers}).pipe(map(res=>res.json()));
  }

  updateProduct(product){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer '+this.authService.userToken);
    return this.http.post('/api/update-product',product, {headers:headers}).pipe(map(res=>res.json()));    
  }

  deleteProduct(product){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer '+this.authService.userToken);
    return this.http.post('/api/delete-product',product, {headers:headers}).pipe(map(res=>res.json()));
  }

  deleteProductImage(product){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer '+this.authService.userToken);
    return this.http.post('/api/delete-product-image',product, {headers:headers}).pipe(map(res=>res.json()));
  }

  searchClientsCompany(company){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer '+this.authService.userToken);
    return this.http.post('/api/clients-company', company, {headers :headers}).pipe(map(res=>res.json()));
  }

  getPhones(client){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', 'Bearer '+this.authService.userToken)
    return this.http.post('/api/get-phones', client, {headers : headers}).pipe(map(res=>res.json()));
  }

  getUsers(){
    let headers = new Headers();
    headers.append('Authorization', 'Bearer '+this.authService.userToken)
    return this.http.get('/api/get-users', {headers : headers}).pipe(map(res=>res.json()));
  }

  updateUser(user){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', 'Bearer '+this.authService.userToken)
    return this.http.post('/api/update-user', user, {headers : headers}).pipe(map(res=>res.json()));
  }

  blockUser(user){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', 'Bearer '+this.authService.userToken)
    return this.http.post('/api/block-user', user, {headers : headers}).pipe(map(res=>res.json()));
  }

  loadImg(file) {
    return new Promise((resolve, reject) => {
      let tipo;
      console.log(file.type)
      if (file) {
        switch (file.type) {
          case 'image/gif':
            tipo = 'data:image/gif;base64,';
            break;
          case 'image/jpeg':
            tipo = 'data:image/jpeg;base64,';
            break;
          case 'image/png':
            tipo = 'data:image/png;base64,';
            break;
          case 'image/svg+xml':
            tipo = 'data:image/svg+xml;base64,';
            break;
          case 'application/pdf':
            tipo = 'data:image/pdf;base64,';
            break;
          default:
            tipo = null;
            return;
        }
        const reader = new FileReader();
        if(tipo) {
          reader.onload = readEvt => {
            const binaryString = (readEvt.target as any).result;
            const base64 = btoa(binaryString);
            const resultado = tipo + base64;
            resolve(resultado);
          }
          reader.readAsBinaryString(file);
        } else {
          reject('Invalid image format')
        }
      } else {
        reject('Invalid image format');
      }
    });
  }

}
