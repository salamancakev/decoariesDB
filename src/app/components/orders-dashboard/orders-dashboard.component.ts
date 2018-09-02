import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import { AuthService } from "../../services/auth.service";
@Component({
  selector: 'app-orders-dashboard',
  templateUrl: './orders-dashboard.component.html',
  styleUrls: ['./orders-dashboard.component.css']
})
export class OrdersDashboardComponent implements OnInit {

  constructor(private authService : AuthService, private router : Router) { }

  ngOnInit() {
    if(this.authService.user==undefined){
      this.router.navigate(['login']);
    }
  }

}
