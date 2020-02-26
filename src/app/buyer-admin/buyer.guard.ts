import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../service/auth.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuyerGuard implements CanActivate {
  constructor(private authService:AuthService,private router:Router){

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      let url: string = state.url;
      return this.checkLogin(url);
  }
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(route, state);
  }
  checkLogin(url: string): boolean {
    if (this.authService.isBuyerLoggedIn()) { return true; }
    if(this.authService.isLoggedIn()){
      this.router.navigate([this.authService.defaultNavigationURL]);
      return false;
    }
    this.authService.redirectURL = url;
    // Store the attempted URL for redirecting
    //this.authService.logout();
    // Navigate to the login page with extras
    this.router.navigate(['/login/buyer']);
    return false;
  }
}
