import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(private _loginService: LoginService, private _router: Router) { }

  ngOnInit(): void {
    this._loginService.user.subscribe(res => {
      if (res != null) {
        console.log("Already logged in!");
        this._router.navigate(['/dashboard']);
      }
    });
  }

  login(): void {
    this._loginService.login();
  }

  logout(): void {
    this._loginService.logout();
  }
}
