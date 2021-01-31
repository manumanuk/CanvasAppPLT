import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { fabric } from 'fabric';
import { CanvasLoadService } from 'src/app/services/canvas-load.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {

  public canvas: fabric.Canvas = null;
  private userData: firebase.default.User = null;
  public brushColor: string = "#000000";
  public brushSize: number = 1;
  public mode: string = "Enable Eraser";
  constructor(private _loginService: LoginService, private _router: Router, private _loader: CanvasLoadService) {}

  ngOnInit(): void {
    this.canvas = new fabric.Canvas("kanvio-board");
    this.canvas.isDrawingMode = true;
    this._loginService.user.subscribe(res => {
      if (res == null) {
        console.log("Not logged in!");
        this._router.navigate(['/']);
      } else {
        this.userData = res;
        fabric.loadSVGFromString(this._loader.loadCached(this.userData.uid), (res) => {
          for (const obj of res) {
            this.canvas.add(obj);
          }
          this.canvas.on('mouse:up', () => {
            this.save();
          });
        });
      }
    });
  }

  save() {
    this._loader.saveData(this.userData.uid, this.canvas.toSVG());
  }

  enableEraserMode() {
    if (this.mode=="Enable Eraser"){
      this.canvas.freeDrawingBrush.color="rgb(246, 235, 205)";
      this.mode = "Disable Eraser";
      document.getElementById("brush-color").setAttribute("disabled", "true");
    } else {
      this.canvas.freeDrawingBrush.color = this.brushColor;
      this.mode = "Enable Eraser";
      document.getElementById("brush-color").removeAttribute("disabled");
    }
  }

  updateBrushColor() {
    this.canvas.freeDrawingBrush.color = this.brushColor;
  }

  updateBrushSize() {
    this.canvas.freeDrawingBrush.width = this.brushSize;
  }
}
