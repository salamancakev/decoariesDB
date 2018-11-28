import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {DatabaseService} from '../../services/database.service';
import {ExcelService} from '../../services/excel.service';
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
  excelJson =[];

  constructor(private authService : AuthService, private dbService : DatabaseService, private modalService : NgbModal, private excelService : ExcelService) { }

  ngOnInit() {
  this.dbService.getProducts().subscribe(data=>{
    this.products=data;
    let percentage
    this.products.forEach(value=>{
      this.dbService.getProductReport(value).subscribe(data=>{
        console.log(data)
       if(data.completed==null){
         data.completed=0
       }
       if(data.denied == null){
         data.denied=0
       }
       if(data.total==null){
         data.total=0
       }
       if(data.total==0 && data.completed==0){
         percentage=0
       }
       else{
         percentage=(data.completed/data.total)*100
       }
       this.excelJson.push({
        "Name" : value.Name,
        "Total In Orders" : data.total,
        "Total Sold": data.completed,
        "Total Denied" : data.denied,
        "Percentage Sold": percentage+"%"
       })
      })
    })

    console.log(this.excelJson)
  });
  
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
    
      if(this.totalQuantity==0 && this.completedQuantity==0){
        this.percentage=0
      }
      else{
        this.percentage= (this.completedQuantity/this.totalQuantity)*100
      }
    
    console.log(this.percentage)

    this.modalService.open(content, {size : 'lg'})

    })

  }


  downloadProductReport(){
    let excelJson = [{
      Name : this.selectedProduct.Name,
      TotalInOrders : this.totalQuantity,
      TotalSold : this.completedQuantity,
      TotalDenied : this.deniedQuantity,
      PercentageSold : this.percentage
    } ] 

    return this.excelService.exportAsExcelFile(excelJson, this.selectedProduct.Name+' Report');
  }


  productsReport(){
  return  this.excelService.exportAsExcelFile(this.excelJson, 'Report')
  }

}
