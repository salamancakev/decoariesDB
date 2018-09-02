import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import { AuthService } from "../../services/auth.service";
@Component({
  selector: 'app-products-dashboard',
  templateUrl: './products-dashboard.component.html',
  styleUrls: ['./products-dashboard.component.css']
})
export class ProductsDashboardComponent implements OnInit {

  constructor(private authService : AuthService, private router : Router) { }

  ngOnInit() {
    if(this.authService.user==undefined){
      this.router.navigate(['login']);
    }
  }

}
