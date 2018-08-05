import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {DatePipe} from "@angular/common";
import { FlashMessagesService } from 'angular2-flash-messages';
import { DatabaseService } from "../../services/database.service";
import { ValidateService } from "../../services/validate.service";

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {

    orderProducts = [];
    clients : any[];
    products : any[];

    quantity : Number;

    selectedClient : any;
    selectedProduct : any;
    date : Date;

  constructor(private router : Router,
    private datePipe : DatePipe,
    private dbService : DatabaseService,
    private validateService : ValidateService,
    private flashMessage : FlashMessagesService) { }

  ngOnInit() {
    this.dbService.getClients().subscribe(data=>{
      this.clients=data[0]
    })

    this.dbService.getProducts().subscribe(data=>{
      this.products=data
    })
  }

  addProduct(){
    let product = {
      idProduct : this.selectedProduct,
      Quantity : this.quantity
    }
    if(this.selectedProduct==undefined){
      this.flashMessage.show("Please select a product", {cssClass : "alert-danger"})
      return false;
    }
    else if(this.quantity==null || this.quantity<=0){
      this.flashMessage.show("Please enter the quantity of the selected product", {cssClass: "alert-danger"})
      return false;
    }
    this.orderProducts.push(product);

    this.selectedProduct=null;
    this.quantity=null;
  }

  onSubmit(){
    this.date = new Date();
      let registerDate=this.datePipe.transform(this.date, 'yyyy-MM-dd');

  let order = {
    idClient : this.selectedClient,
    orderProducts: this.orderProducts,
    orderDate : registerDate
  }

 this.dbService.addOrder(order).subscribe(data=>{
   if(data.success){
    this.flashMessage.show(data.msg, {cssClass: 'alert-success'})
    this.router.navigate(['orders'])
   }
   else{
     this.flashMessage.show(data.msg, {cssClass :'alert-danger'})
     this.router.navigate(['orders'])
   }
 })
}

}
