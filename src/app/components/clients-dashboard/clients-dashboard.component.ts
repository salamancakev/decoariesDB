import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import { AuthService } from "../../services/auth.service";
@Component({
  selector: 'app-clients-dashboard',
  templateUrl: './clients-dashboard.component.html',
  styleUrls: ['./clients-dashboard.component.css']
})
export class ClientsDashboardComponent implements OnInit {

  constructor(private authService : AuthService, private router : Router) { }

  ngOnInit() {
    if(this.authService.user==undefined){
      this.router.navigate(['login']);
    }
  }

}
