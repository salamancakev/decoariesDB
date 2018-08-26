import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service'
@Component({
  selector: 'app-users-dashboard',
  templateUrl: './users-dashboard.component.html',
  styleUrls: ['./users-dashboard.component.css']
})
export class UsersDashboardComponent implements OnInit {

  constructor(private authService : AuthService, private router : Router) { }

  ngOnInit() {
    if(this.authService.user==undefined){
      this.router.navigate(['login']);
    }
  }

}
