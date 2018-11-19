import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {DatabaseService} from '../../services/database.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';

@Component({
  selector: 'app-analysis-product',
  templateUrl: './analysis-product.component.html',
  styleUrls: ['./analysis-product.component.css']
})
export class AnalysisProductComponent implements OnInit {

  products : any[];
  selectedProduct : any;
  totalQuantity: number;
  completedQuantity: number;
  deniedQuantity: number;
  percentage : number;

  constructor(private authService : AuthService, private dbService : DatabaseService, private modalService : NgbModal) { }

  ngOnInit() {
  this.dbService.getProducts().subscribe(data=>{
    this.products=data;
  })
  }

  onSubmit(content){

    this.dbService.getProductReport(this.selectedProduct).subscribe(data=>{
      console.log(data)
      this.completedQuantity=data.completed
      if(this.completedQuantity==null){
        this.completedQuantity=0
      }
      this.deniedQuantity=data.denied
      if(this.deniedQuantity==null){
        this.deniedQuantity=0
      }
      this.totalQuantity=data.total
      if(this.totalQuantity==null){
        this.totalQuantity=0
      }

    this.percentage= (this.completedQuantity/this.totalQuantity)*100
    console.log(this.percentage)

    this.modalService.open(content, {size : 'lg'})

    })

  }

}
