import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router, public loginService: LoginService) {}

  ngOnInit() {}
  action(Param: any, event: any) {
    event.preventDefault();
    switch (Param) {
      case 'newuser':
        this.router.navigate(['auth', 'newuser']);
        break;
      case 'home':
        this.router.navigate(['auth', 'profile']);
        break;
      case 'logout':
        this.loginService.logOut();
        break;
      case 'profile':
        this.router.navigate(['profile']);
        break;
      case 'root':
        this.router.navigate(['profile']);
        break;
        case 'graphs':
        this.router.navigate([ 'graphs']);
        break;
        
      default:
        break;
    }
  }
}
