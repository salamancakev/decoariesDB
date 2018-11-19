import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-analisis-dashboard',
  templateUrl: './analisis-dashboard.component.html',
  styleUrls: ['./analisis-dashboard.component.css']
})
export class AnalisisDashboardComponent implements OnInit {

  constructor(private authService : AuthService, private router : Router) { }

  ngOnInit() {
    if(this.authService.user==undefined){
      this.router.navigate(['login']);
    }
  }

}
