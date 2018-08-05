import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {DatePipe} from "@angular/common";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FlashMessagesService } from 'angular2-flash-messages';
import { DatabaseService } from "../../services/database.service";
import { ValidateService } from "../../services/validate.service";
@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.css']
})
export class ViewOrdersComponent implements OnInit {
    columns = ['idOrder', 'Client', 'Email', 'Company', 'Order Date'];
    edit = false;
    orders : any[];
    orderDetails: any;
    selectedOrder : any;

    clients : any[];
    products: any[];
    selectedClient : any;
    selectedProduct: any;
    orderProducts = [];
    quantity: any;

  constructor(private router : Router,
    private datePipe : DatePipe,
    private dbService : DatabaseService,
    private validateService : ValidateService,
    private flashMessage : FlashMessagesService,
    private modalService : NgbModal) { }

  ngOnInit() {
    this.dbService.getClients().subscribe(data=>{
      this.clients=data[0]
    })

    this.dbService.getProducts().subscribe(data=>{
      this.products=data
    })
    this.dbService.getOrders().subscribe(data=>{
      this.orders=data[0]
    })
  }

  openOrderDetails(order, content){
    this.edit=false;
    this.selectedOrder= order;
   this.dbService.getOrderDetails(order).subscribe(data=>{
     this.orderDetails = data[0];
     this.modalService.open(content);
   })
  }

  onEdit(){
    this.edit=true;
    
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
    else if(this.quantity==null){
      this.flashMessage.show("Please enter the quantity of the selected product", {cssClass: "alert-danger"})
      return false;
    }
    else if(this.quantity<=0){
      this.flashMessage.show("The quantity of the product you entered is invalid. Please enter a valid number", {cssClass : 'alert-danger'})
      return false;
    }
    this.orderProducts.push(product);

    this.selectedProduct=null;
    this.quantity=null;
  }

  onSubmit(){

    let order = {
      idOrder : this.selectedOrder.idOrder,
      idClient : this.selectedClient,
      orderProducts : this.orderProducts,
    }

    this.dbService.updateOrder(order).subscribe(data=>{
      if(data.success){
        this.flashMessage.show(data.msg, {cssClass : 'alert-success'})
        this.router.navigate(['orders']);
      }

      else{
        this.flashMessage.show(data.msg, {cssClass : 'alert-danger'})
        this.router.navigate(['alert-danger']);
      }

    })
  }

}
