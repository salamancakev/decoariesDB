import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {DatePipe, formatDate} from "@angular/common";
import { FlashMessagesService } from 'angular2-flash-messages';
import { DatabaseService } from "../../services/database.service";
import { ValidateService } from "../../services/validate.service";
import {AuthService } from '../../services/auth.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

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
    price : Number;
    selectedClient : any;
    selectedProduct : any;
    date : Date;
    observations : String;
    status : String;

    name : String;
    email : String;
    gender : String;
    phones = [];
    company : String;
    website : String;
    selectedPhone : String;
    companyNames: any[];
    companies : any [];
    clientModalReference:  any;
    searchModalReference: any;

    idUser : any;
    method : Number;
    email1 : any;
    email2 : any;

    columns = [];

  constructor(private router : Router,
    private datePipe : DatePipe,
    private dbService : DatabaseService,
    private validateService : ValidateService,
    private authService : AuthService,
    private flashMessage : FlashMessagesService,
    private modalService : NgbModal) { }

  ngOnInit() {
    this.dbService.getClients().subscribe(data=>{
      this.clients=data[0]
    })

    this.dbService.getProducts().subscribe(data=>{
      this.products=data
    })

    let names = [];
    this.dbService.getCompanies().subscribe(data=>{
      this.companies = data;
      this.companies.forEach(function(value){
        names.push(value.Name)
      })
      this.companyNames = names;
    });

    this.idUser=this.authService.user.idUser;

    if(this.authService.user.Type == 'Admin'){
      this.columns=['Name', 'Gender', 'Email', 'Status', 'Company', 'Website', 'createdBy'];
    }

    else{
      this.columns=['Name', 'Gender', 'Email', 'Status', 'Company', 'Website'];
    }
  }

  openSearchClient(content){
    this.searchModalReference=this.modalService.open(content);
  }

  onSelectClient(client){
    this.selectedClient=client.idClient;
    this.searchModalReference.close();
  }

  openAddClient(content){
    this.clientModalReference= this.modalService.open(content);
  }

  onAddPhone(){
    if(this.selectedPhone==undefined){
      this.flashMessage.show('Please enter a phone number', {cssClasS: 'alert-danger'})
      return false
    }

    this.phones.push(this.selectedPhone);
    this.selectedPhone=null;

  }


  onAddClient(){
    try{
      this.date = new Date();
            let registerDate=formatDate(this.date,  'yyyy-MM-dd HH:mm:ss', 'en-us','-0400');
            let exists=false;
            if(this.companyNames.includes(this.company)){
              exists=true;
            }
          
      
          const client = {
            name : this.name,
            email : this.email,
            gender : this.gender,
            status : 'Active',
            phones : this.phones,
            companyName : this.company,
            companyWebsite : this.website,
            date : registerDate,
            exists : exists,
            idUser : this.idUser
          }
      
          if(!this.validateService.validateClientRegister(client)){
            this.flashMessage.show('Please fill in all fields', {cssClass: "alert-danger"});
            return false;
          }
      
          if(!this.validateService.validateEmail(client.email)){
            this.flashMessage.show('Please enter a valid email address', {cssClass : "alert-danger"});
            return false;
          }
      
          this.clients.forEach(value=>{
            if(value.Name == client.name || value.Email == client.email){
              this.flashMessage.show("Client already exists in database", {cssClass : 'alert-danger'})
              return false;
            }
          })
      
          this.dbService.registerClient(client).subscribe(data=>{
            if(data.success){
              this.flashMessage.show('Client added to DB', {cssClass : "alert-success"});
              this.dbService.getClients().subscribe(data=>{
                this.clients=data[0];
                this.clientModalReference.close();
              })
              
            }
            else{
              this.flashMessage.show('Client already exists in database', {cssClass : "alert-danger"});
              this.clientModalReference.close();
              return false;
            }
          })
          }
          catch(e){
            console.log(e)
          }
            
  }

  addProduct(){
    let product = {
      idProduct : this.selectedProduct.idProduct,
      Name : this.selectedProduct.Name,
      Description : this.selectedProduct.Description,
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
    this.flashMessage.show("Product added to order", {cssClass : 'alert-success'});
    this.selectedProduct=null;
    this.quantity=null;
  }

  onSubmit(){
    this.date = new Date();
      let registerDate=this.datePipe.transform(this.date, 'yyyy-MM-dd');

  let order = {
    idClient : this.selectedClient,
    orderProducts: this.orderProducts,
    price : this.price,
    observations : this.observations,
    status : this.status,
    orderDate : registerDate
  }
  if(this.orderProducts.length==0){
    this.flashMessage.show('Please add products to the order', {cssClass: 'alert-danger'})
    return false;
  }
  if(!this.validateService.validateOrder(order)){
    this.flashMessage.show("Please fill in all fields", {cssClass : 'alert-danger'})
    return false;
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
