import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { fabric } from 'fabric';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {

  public canvas: fabric.Canvas = null;
  constructor(private _loginService: LoginService, private _router: Router) {}

  ngOnInit(): void {
    this._loginService.user.subscribe(res => {
      if (res == null) {
        console.log("Not logged in!");
        this._router.navigate(['/']);
      }
    });
    this.canvas = new fabric.Canvas("kanvio-board");
    this.canvas.isDrawingMode = true;
  }

  ngOnDestroy(): void {
    console.log("destroyed");
  }

}
