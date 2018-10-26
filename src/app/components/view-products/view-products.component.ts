import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {NgbTypeahead, NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FlashMessagesService } from 'angular2-flash-messages';
import { DatabaseService } from "../../services/database.service";
import { ValidateService } from "../../services/validate.service";
import { AuthService } from '../../services/auth.service';
import { ReplaySubject } from 'rxjs';
@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent implements OnInit {

  columns = ['Name', 'Description', 'Size']

  products : any[];
  selectedProduct : any;
  confirm = false;
  email : any;
  detailsReference : any;
  deleteReference : any;
  imageReference : any;

  newImage = false;

  user : any;
  adminPass : any;
  errorMsg: any;
  auth0 =false;

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
    this.detailsReference=this.modalService.open(content, {size : 'lg'});

  }

  onChange(evt){
    this.dbService.loadImg(evt.target.files[0]).then(link => {
      this.selectedProduct.URL = link;
      this.newImage = true;
    }).catch(err => console.log(err));
 }

  onConfirm(){
    this.confirm=true;
  }

  unconfirm(){
    this.confirm=false;
  }

  openImage(product, content){
    this.selectedProduct=product
    let url : String;
    let newUrl : String;
    url = this.selectedProduct.URL
    if(url.includes('.pdf')){
     newUrl= url.replace('.pdf', '.jpg')
      this.selectedProduct.URL=newUrl
    }
    this.imageReference=this.modalService.open(content, {size : 'lg'})
  }
  confirmDelete(product, content){
    this.selectedProduct=product;
    this.deleteReference=this.modalService.open(content);
  }

  close(){
  this.confirm=false;
  this.detailsReference.close();
  }

  closeDelete(){
    this.adminPass=null;
    this.errorMsg=null;
    this.auth0=false;
    this.deleteReference.close();
  }

  closeImage(){
    this.imageReference.close();
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
    if(this.selectedProduct.URL){
      this.dbService.deleteProductImage(this.selectedProduct).subscribe(data=>{
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
    else{
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
    
  }

  onSubmit(){

    let product = {
      idProduct : this.selectedProduct.idProduct,
      name : this.selectedProduct.Name,
      size : this.selectedProduct.Size,
      cloth : this.selectedProduct.ClothType,
      description : this.selectedProduct.Description,
      url : this.selectedProduct.URL,
      imageID : this.selectedProduct.imageID,
      modified : this.newImage
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
