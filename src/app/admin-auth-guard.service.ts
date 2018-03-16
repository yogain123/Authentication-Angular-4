import { CanActivate, Route, Router } from '@angular/router';
import { AuthGuard } from './auth-guard.service';
import { Injectable } from '@angular/core';
import { AuthService } from './services/auth.service';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService){

  }
  canActivate() {
    let user = this.authService.currentUser;
    if(user && user.admin)
      return true;

    this.router.navigate(['/no-access'])
    return false;
  }
}
