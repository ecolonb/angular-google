import { Component } from '@angular/core';
import { LoginService } from './services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Agular with google sign';
  constructor(private login: LoginService, private router: Router) {
    this.login
      .getUserInfoFromStorage()
      .then(response => {
        this.login.logged.subscribe(newState => {
          if (!newState) {
            this.router.navigate(['login'], { replaceUrl: true });
          } else {
            this.router.navigate(['graphs'], { replaceUrl: true });
          }
        });
      })
      .catch(err => {
        console.log('Error-->>');
        this.login.logged.subscribe(newState => {
          if (!newState) {
            this.router.navigate(['login'], { replaceUrl: true });
          } else {
            this.router.navigate(['profile'], { replaceUrl: true });
          }
        });
      });
  }
}
