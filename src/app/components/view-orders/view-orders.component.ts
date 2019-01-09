import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {Router} from '@angular/router';
import {DatePipe} from "@angular/common";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FlashMessagesService } from 'angular2-flash-messages';
import { DatabaseService } from "../../services/database.service";
import { ValidateService } from "../../services/validate.service";
import { AuthService } from '../../services/auth.service';
declare var $;
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
    deleteModalReference : any;

    products: any[];
    selectedProduct: any;
    orderProducts = [];
    quantity=0;
    color : any;
    cloth : any;
    totalQuantity=0;
    confirm =false;
    field : any;
    client : any;
    orderID : any;
    email : any;
    status : any;
    company : any;
    price : any;
    date : any;

    reason : any;

    editProducts : boolean;

    user : any;
    adminPass : any;
    errorMsg: any;
    auth0 =false;

    createdBy: any;
    modifiedBy : any;

  constructor(private router : Router,
    private datePipe : DatePipe,
    private dbService : DatabaseService,
    private validateService : ValidateService,
    private authService : AuthService,
    private flashMessage : FlashMessagesService,
    private modalService : NgbModal) { }

  ngOnInit() {

    this.dbService.getProducts().subscribe(data=>{
      this.products=data
    })
    this.dbService.getOrders().subscribe(data=>{
      this.orders=data[0]
    })

    this.editProducts=false;

    this.user=this.authService.user;
  }

  openOrderDetails(order, details){
    this.edit=false;
    this.selectedOrder= order;

   this.dbService.getOrderDetails(order).subscribe(data=>{
     this.orderDetails = data[0];
     this.orderDetails.forEach(value => {
      this.totalQuantity=this.totalQuantity+value.Quantity
      
    });
      this.detailsModalReference=this.modalService.open(details);
   })

   this.dbService.getOrderUser(order).subscribe(data=>{
     this.createdBy=data.createdBy
     this.modifiedBy=data.modifiedBy
   })

   
   
  }

  onEdit(content){
    this.detailsModalReference.close();
    this.edit=true;
    this.editModalReference=this.modalService.open(content, {size : 'lg'})
    
  }

  addProduct(){
    let product = {
      idProduct : this.selectedProduct.idProduct,
      Name: this.selectedProduct.Name,
      Description : this.selectedProduct.Description,
      Quantity : this.quantity,
      Color : this.color,
      ClothType : this.cloth
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
    this.orderDetails.push(product);
    this.totalQuantity=this.totalQuantity+this.quantity;
    this.flashMessage.show("Product added to order", {cssClass : 'alert-success'});
    this.selectedProduct=null;
    this.quantity=0;
    this.color=null;
    this.cloth=null
  }

  onDeleteProduct(product){
    let index = this.orderDetails.indexOf(product)
  let array;
  if(index>-1){
   array= this.orderDetails.splice(index, 1)
  }
  this.totalQuantity=this.totalQuantity-product.Quantity;
  console.log(array)
  }

  onConfirm(){
    this.confirm=true;
  }

  unconfirm(){
    this.confirm=false;
  }

  confirmDelete(order, content){
    this.selectedOrder=order;
    this.deleteModalReference=this.modalService.open(content);
  }

  close(){
    this.confirm=false
    this.orderProducts=[];
    this.quantity=null;
    this.color=null;
    this.cloth=null;
    this.totalQuantity=0;
    this.editProducts=false;
    this.editModalReference.close();
  }

  closeDelete(){
    this.auth0=false;
    this.errorMsg = null;
    this.adminPass=null;
    this.deleteModalReference.close()
  }

  onEditProducts(){
  this.editProducts=true;
  }

  authDelete(){
    let user = {
      email : this.authService.user.Email,
      password : this.adminPass
    }
    this.authService.login(user).subscribe(data=>{
      if(data.error){
        this.errorMsg = data.msg;
        return false;
      }

      else{
        this.auth0=true;
        this.errorMsg = null;
      }
    })
  }

  onDelete(){
    this.selectedOrder.idUser=this.authService.user.idUser
    this.dbService.deleteOrder(this.selectedOrder).subscribe(data=>{
      if(data.success){
        this.flashMessage.show(data.msg, {cssClass : 'alert-success'})
        this.deleteModalReference.close()
        this.router.navigate(['orders'])
      }

      else{
        this.flashMessage.show("Something went wrong", {cssClass : 'alert-danger'})
        this.deleteModalReference.close()
        this.router.navigate(['orders'])
      }
    })
  }

  onSubmit(){
   let order = {
      idOrder : this.selectedOrder.idOrder,
      idClient : this.selectedOrder.idClient,
      orderProducts : this.orderDetails,
      price : this.selectedOrder.Price,
      status : this.selectedOrder.Status,
      observations : this.selectedOrder.Observations,
      idUser : this.authService.user.idUser
    }
   

    

    if(this.orderDetails.length==0){
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
