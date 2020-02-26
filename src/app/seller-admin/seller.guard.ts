import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../service/auth.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SellerGuard implements CanActivate {
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
    if (this.authService.isSellerLoggedIn()) { return true; }
    if (this.authService.isLoggedIn()) {
        this.router.navigate([this.authService.defaultNavigationURL])
       return false; 
      }
    // Store the attempted URL for redirecting
    this.authService.redirectURL = url;
 
    // Navigate to the login page with extras
    this.router.navigate(['/login/seller']);
    return false;
  }
}
