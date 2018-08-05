import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { DatabaseService } from "../../services/database.service";
import { ValidateService } from "../../services/validate.service";
@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent implements OnInit {

  columns = ['idProduct', 'ProductName']

  products : any[];
  selectedProduct : any;

  constructor(private router : Router,
  private dbService : DatabaseService,
  private validateService : ValidateService,
  private flashMessage : FlashMessagesService) { }

  ngOnInit() {
    this.dbService.getProducts().subscribe(data=>{
      this.products=data;
    })
  }

  onClick(product){
    this.selectedProduct=product;
  }

  onSubmit(){

    let product = {
      idProduct : this.selectedProduct.idProduct,
      name : this.selectedProduct.ProductName
    }

    if(this.selectedProduct.ProductName == ''){
      this.flashMessage.show("Please fill in all fields", {cssClass : 'alert-danger'})
      return false;
    }

    this.dbService.updateProduct(product).subscribe(data=>{
      if(data.success){
        this.flashMessage.show(data.msg, {cssClass :'alert-success'})
        this.router.navigate(['products']);
      }
      else{
        this.flashMessage.show(data.msg, {cssClass : 'alert-danger'})
        this.router.navigate(['products']);
      }
    })

  }

}
