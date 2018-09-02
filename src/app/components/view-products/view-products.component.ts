import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {NgbTypeahead, NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FlashMessagesService } from 'angular2-flash-messages';
import { DatabaseService } from "../../services/database.service";
import { ValidateService } from "../../services/validate.service";
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
  modalReference : any;

  constructor(private router : Router,
  private dbService : DatabaseService,
  private validateService : ValidateService,
  private modalService : NgbModal,
  private flashMessage : FlashMessagesService) { }

  ngOnInit() {
    this.dbService.getProducts().subscribe(data=>{
      this.products=data;
    })
  }

  onClick(product, content){
    this.selectedProduct=product;
    this.modalReference=this.modalService.open(content);

  }

  onConfirm(){
    this.confirm=true;
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
        this.modalReference.close();
        this.flashMessage.show(data.msg, {cssClass :'alert-success'})
        this.router.navigate(['products']);
      }
      else{
        this.modalReference.close();
        this.flashMessage.show(data.msg, {cssClass : 'alert-danger'})
        this.router.navigate(['products']);
      }
    })

  }

}
