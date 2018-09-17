import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {NgbTypeahead, NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FlashMessagesService } from 'angular2-flash-messages';
import { DatabaseService } from "../../services/database.service";
import { ValidateService } from "../../services/validate.service";
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent implements OnInit {

  columns = ['Name', 'Description', 'Size', 'ClothType', 'URL']

  products : any[];
  selectedProduct : any;
  confirm = false;
  email : any;
  detailsReference : any;
  deleteReference : any;

  user : any;

  constructor(private router : Router,
  private dbService : DatabaseService,
  private validateService : ValidateService,
  private authService : AuthService,
  private modalService : NgbModal,
  private flashMessage : FlashMessagesService) { }

  ngOnInit() {
    this.dbService.getProducts().subscribe(data=>{
      this.products=data;
    })

    this.user=this.authService.user;
  }

  onClick(product, content){
    this.selectedProduct=product;
    this.detailsReference=this.modalService.open(content);

  }

  onConfirm(){
    this.confirm=true;
  }

  unconfirm(){
    this.confirm=false;
  }

  confirmDelete(product, content){
    this.selectedProduct=product;
    this.deleteReference=this.modalService.open(content);
  }

  onDelete(){
    this.dbService.deleteProduct(this.selectedProduct).subscribe(data=>{
      if(data.success){
        this.flashMessage.show(data.msg, {cssClass : 'alert-success'})
        this.deleteReference.close();
        this.router.navigate(['products']);
      }

      else{
        this.flashMessage.show(data.msg, {cssClass : 'alert-danger'})
        this.deleteReference.close();
        this.router.navigate(['products']);
      }
    })
  }

  onSubmit(){

    let product = {
      idProduct : this.selectedProduct.idProduct,
      name : this.selectedProduct.Name,
      size : this.selectedProduct.Size,
      cloth : this.selectedProduct.ClothType,
      description : this.selectedProduct.Description,
      url : this.selectedProduct.URL
    }

    this.dbService.updateProduct(product).subscribe(data=>{
      if(data.success){
        this.detailsReference.close();
        this.flashMessage.show(data.msg, {cssClass :'alert-success'})
        this.router.navigate(['products']);
      }
      else{
        this.detailsReference.close();
        this.flashMessage.show(data.msg, {cssClass : 'alert-danger'})
        this.router.navigate(['products']);
      }
    })

  }

}
