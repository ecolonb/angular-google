import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { AlertsService } from '../../services/alerts.service';
import { LoginRequest } from '../../models/login-request';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: []
})
export class LoginComponent implements OnInit {
  showSpinner = false;
  usernameBinding: '';
  password: '';
  litre: '';
  attached = false;
  auth2: any;
  that = this;
  constructor(
    public loginService: LoginService,
    private router: Router,
    private alerts: AlertsService
  ) {}

  ngOnInit() {
    this.googleInit();
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id:
          '534021773218-la91isuqaiasbqa39326oa0lt9oklkjk.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
    });
  }

  attachSignFN(element) {
    this.auth2.attachClickHandler(element, {}, googleUser => {
      const profile = googleUser.getBasicProfile();
      const token = googleUser.getAuthResponse().id_token;
      profile.token = token;
      this.loginService.setProfile(profile).then(res => {
        this.showSpinner = false;
        this.loginService.setAuth(true);
      });
    });
  }

  googleSignFN() {
    if (!this.attached) {
      this.attached = true;
      this.attachSignFN(document.getElementById('googleSignBtn'));
    } else {
      this.showSpinner = true;
    }
  }
  loginUsernamePassword(evt: any, formLogin: any) {
    evt.preventDefault();
    this.showSpinner = true;
    let { username, password } = formLogin;
    username = username.value.trim().toLowerCase();
    password = password.value.trim().toLowerCase();

    if (username === '' || password === '') {
      this.alerts.errorAlert(
        'Debes ingresar tu nombre de usuario y contraseña'
      );
      this.showSpinner = false;
    } else {
      const loginData: LoginRequest = {
        username,
        password
      };

      this.loginService
        .loginUserAndPassword(loginData)
        .then(response => {
          this.showSpinner = false;
          this.loginService.setAuth(true);
        })
        .catch(err => {
          this.showSpinner = false;
          this.alerts.errorAlert(
            'Error al iniciar sesión, ¿Es correcta la informción?'
          );
        });
    }
  }
}
