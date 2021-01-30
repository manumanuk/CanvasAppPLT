import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {

  constructor(private _loginService: LoginService, private _router: Router) { }

  ngOnInit(): void {
    this._loginService.user.subscribe(res => {
      if (res == null) {
        console.log("Not logged in!");
        this._router.navigate(['/']);
      }
    });
  }

}
