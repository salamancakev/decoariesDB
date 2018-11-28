import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {DatabaseService} from '../../services/database.service';
import {ExcelService} from '../../services/excel.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';

@Component({
  selector: 'app-analysis-company',
  templateUrl: './analysis-company.component.html',
  styleUrls: ['./analysis-company.component.css']
})
export class AnalysisCompanyComponent implements OnInit {

 companies : any[];
 selectedCompany : any;
 totalOrders : number;
 totalCompleted: number;
 totalDenied : number;
 percentage: number;
 excelJson = [];
  constructor(private authService : AuthService, private dbService : DatabaseService, private excelService : ExcelService, private modalService : NgbModal) { }
 
  ngOnInit() {
    this.dbService.getCompanies().subscribe(data=>{
      this.companies=data;
      let percentage
      this.companies.forEach(value=>{
        this.dbService.getCompanyReport(value).subscribe(data=>{
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
        "Orders Made" : data.total,
        "Total Sold": data.completed,
        "Total Denied" : data.denied,
        "Percentage Sold": percentage+"%"
          })
        })
      })
    })
    }
  
    onSubmit(content){
  
      this.dbService.getCompanyReport(this.selectedCompany).subscribe(data=>{
        console.log(data)
        this.totalCompleted=data.completed
        if(this.totalCompleted==null){
          this.totalCompleted=0
        }
        this.totalDenied=data.denied
        if(this.totalDenied==null){
          this.totalDenied=0
        }
        this.totalOrders=data.total
        if(this.totalOrders==null){
          this.totalOrders=0
        }
  
      this.percentage= (this.totalCompleted/this.totalOrders)*100
      console.log(this.percentage)
  
      this.modalService.open(content, {size : 'lg'})
  
      })
  
    }

    downloadReport(){
     return this.excelService.exportAsExcelFile(this.excelJson, "Company Report")
    }
}
