import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {DatabaseService} from '../../services/database.service';
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
  constructor(private authService : AuthService, private dbService : DatabaseService, private modalService : NgbModal) { }
 
  ngOnInit() {
    this.dbService.getCompanies().subscribe(data=>{
      this.companies=data;
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
}
