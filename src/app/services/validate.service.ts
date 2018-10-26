import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  validateClientRegister(client){

      if(client.name == undefined || client.email == undefined || client.gender == undefined || client.status == undefined ||  client.companyName == undefined){
        return false
      }

      else if(client.name == '' || client.email == '' || client.gender == '' || client.status == '' ||  client.companyName == '' || client.phone1 == ''){
        return false;
      }

      else{
        return true
      }

  }


  validateWebsite(client){
    if(!client.exists && client.companyWebsite == undefined){
      return false;
    }
    else{
      return true;
    }
  }

  validateEmail(email){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  validateCompany(company){
    if(company.name == undefined || company.website == undefined || company.name=='' || company.website==''){
      return false;
    }
    else{
      return true;
    }
  }

  validateProduct(product){
    if(product.name==undefined || product.size == undefined){
      return false;
    }
    else{
      return true;
    }
  }

  validateOrder(order){
    if(order.orderProducts==undefined || order.price==undefined || order.price == ''){
      return false;
    }
    else{
      return true;
    }
  }

}
