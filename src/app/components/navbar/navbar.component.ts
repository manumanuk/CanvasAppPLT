import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public isLoggedIn: boolean = false;
  public userData: firebase.default.User;
  constructor(private _loginService: LoginService) { }

  ngOnInit(): void {
    this._loginService.user.subscribe(
      res => {
        this.isLoggedIn = res == null;
        this.userData = (res == null) ? null : res;
      }
    );
  }

  login() : void {
    this._loginService.login();
  }

  logout() : void {
    this._loginService.logout();
  }

}
