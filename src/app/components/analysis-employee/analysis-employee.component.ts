import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {DatabaseService} from '../../services/database.service';
import {ExcelService} from '../../services/excel.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';


@Component({
  selector: 'app-analysis-employee',
  templateUrl: './analysis-employee.component.html',
  styleUrls: ['./analysis-employee.component.css']
})
export class AnalysisEmployeeComponent implements OnInit {

  employees : any[];
  selectedEmployee : any;
  totalOrders : number;
  completedOrders : number;
  deniedOrders : number;
  percentage : number;
  excelJson = [];

  constructor(private authService : AuthService, private dbService : DatabaseService, private excelService : ExcelService, private modalService : NgbModal) { }

  ngOnInit() {
    this.dbService.getEmployees().subscribe(data=>{
      this.employees=data
      let percentage
      this.employees.forEach(value=>{
        this.dbService.getEmployeeReport(value).subscribe(data=>{
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
    this.dbService.getEmployeeReport(this.selectedEmployee).subscribe(data=>{
      this.totalOrders = data.total
      if(this.totalOrders==null){
        this.totalOrders=0
      }
      this.completedOrders = data.completed
      if(this.completedOrders==null){
        this.completedOrders=0
      }
      this.deniedOrders = data.denied
      if(this.deniedOrders==null){
        this.deniedOrders=0
      }

      this.percentage=(this.completedOrders/this.totalOrders)*100

      this.modalService.open(content, {size : 'lg'})

    })
  }

  downloadReport(){
    return this.excelService.exportAsExcelFile(this.excelJson, "Employees Report")
  }


}
