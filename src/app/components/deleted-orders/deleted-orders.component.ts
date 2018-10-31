import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { DatabaseService } from "../../services/database.service";
import { ValidateService } from "../../services/validate.service";
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-deleted-orders',
  templateUrl: './deleted-orders.component.html',
  styleUrls: ['./deleted-orders.component.css']
})
export class DeletedOrdersComponent implements OnInit {

  columns = ['idOrder','Client', 'Email', 'Company', 'Date', 'Status', 'Price'];
  orders = []
  orderDetails : any;
  selectedOrder : any;
  detailsModalReference : any;

  constructor(private dbService : DatabaseService,
    private modalService : NgbModal) { }

  ngOnInit() {
    this.dbService.getDeletedOrders().subscribe(data=>{
      this.orders=data[0]
    })
  }

  openOrderDetails(order, details){
    this.selectedOrder=order

    this.dbService.getOrderDetails(this.selectedOrder).subscribe(data=>{
      this.orderDetails=data[0]
    })

    this.detailsModalReference = this.modalService.open(details)
  }

  

}
