import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'admin-navigation',
  templateUrl: './admin-navigation.component.html',
  styleUrls: ['./admin-navigation.component.scss']
})
export class AdminNavigationComponent implements OnInit {
  background = 'primary';
  links = [];
  name:string = "";
  constructor(private router: Router,private authService:AuthService) {}

  ngOnInit() {
    this.name = this.authService.getName();
  }
  logout(){
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
