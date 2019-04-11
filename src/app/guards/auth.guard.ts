import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}
  canActivate() {
    console.log(
      'Pasando por el RouterGUARD si es False redirect al login En el Observable. valor -->',
      this.loginService.isAuth()
    );
    if (this.loginService.isAuth()) {
      return this.loginService.isAuth();
    } else {
      return false;
    }
  }
}
