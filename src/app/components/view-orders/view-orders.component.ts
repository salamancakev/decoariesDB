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
    columns = ['idOrder','Client', 'Email', 'Company', 'Date', 'Status', 'Price'];
    edit = false;
    orders : any[];
    orderDetails: any;
    selectedOrder : any;

    detailsModalReference: any;
    editModalReference : any;

    products: any[];
    selectedProduct: any;
    orderProducts = [];
    quantity: any;
    confirm =false;
    email :any;
    
  constructor(private router : Router,
    private datePipe : DatePipe,
    private dbService : DatabaseService,
    private validateService : ValidateService,
    private flashMessage : FlashMessagesService,
    private modalService : NgbModal) { }

  ngOnInit() {

    this.dbService.getProducts().subscribe(data=>{
      this.products=data
    })
    this.dbService.getOrders().subscribe(data=>{
      this.orders=data[0]
    })
  }

  openOrderDetails(order, details){
    this.edit=false;
    this.selectedOrder= order;

   this.dbService.getOrderDetails(order).subscribe(data=>{
     this.orderDetails = data[0];
     console.log(this.orderDetails)
   })

   this.detailsModalReference=this.modalService.open(details);
  }

  onEdit(content){
    this.detailsModalReference.close();
    this.edit=true;
    this.editModalReference=this.modalService.open(content)
    
  }

  addProduct(){
    let product = {
      idProduct : this.selectedProduct.idProduct,
      productName: this.selectedProduct.Name,
      Description : this.selectedProduct.Description,
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
    this.flashMessage.show("Product added to order", {cssClass : 'alert-success'});
    this.selectedProduct=null;
    this.quantity=null;
  }

  onConfirm(){
    this.confirm=true;
    console.log(this.orderProducts);
  }

  onSubmit(){

    let order = {
      idOrder : this.selectedOrder.idOrder,
      idClient : this.selectedOrder.idClient,
      orderProducts : this.orderProducts,
      price : this.selectedOrder.Price,
      status : this.selectedOrder.Status,
      observations : this.selectedOrder.Observations
    }

    if(this.orderProducts.length==0){
      this.flashMessage.show('Please add products to the order', {cssClass: 'alert-danger'});
      return false;
    }

    if(!this.validateService.validateOrder(order)){
      this.flashMessage.show("Please fill in all fields", {cssClass: "alert-danger"})
      return false;
    }

    this.dbService.updateOrder(order).subscribe(data=>{
      if(data.success){
        this.editModalReference.close();
        this.flashMessage.show(data.msg, {cssClass : 'alert-success'})
        this.router.navigate(['orders']);
      }

      else{
        this.editModalReference.close();
        this.flashMessage.show(data.msg, {cssClass : 'alert-danger'})
        this.router.navigate(['alert-danger']);
      }

    })
  }

}
