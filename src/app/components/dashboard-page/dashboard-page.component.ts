import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { fabric } from 'fabric';
import { CanvasLoadService } from 'src/app/services/canvas-load.service';
import { AngularFireUploadTask } from '@angular/fire/storage';

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
  public resizeMode: string = "Enable Resize";
  public brushMode: string = "Enable Eraser";
  constructor(private _loginService: LoginService, private _router: Router, private _loader: CanvasLoadService) {
    
  }

  ngOnInit(): void {
    this.canvas = new fabric.Canvas("kanvio-board");
    this.canvas.isDrawingMode = true;
    this._loginService.user.subscribe(res => {
      if (res == null) {
        console.log("Not logged in!");
        this._router.navigate(['/']);
      } else {
        this.userData = res;
        this.canvas.loadFromJSON(this._loader.loadCached(this.userData.uid), () => {})
        this.canvas.on('mouse:up', () => {
          this.save();
        });
      }
    });
  }

  save(): void {
    this.canvas._objects.map(object=>object.fill="rgba(0, 0, 0, 0)");
    this._loader.saveData(this.userData.uid, this.canvas.toJSON());
  }

  enableEraserMode(): void {
    if (!this.canvas.isDrawingMode) {
      this.enableResize();
    }
    if (this.brushMode=="Enable Eraser"){
      this.canvas.freeDrawingBrush.color="rgb(246, 235, 205)";
      this.brushMode = "Disable Eraser";
      document.getElementById("brush-color").setAttribute("disabled", "true");
    } else {
      this.canvas.freeDrawingBrush.color = this.brushColor;
      this.brushMode = "Enable Eraser";
      document.getElementById("brush-color").removeAttribute("disabled");
    }
  }

  updateBrushColor(): void {
    this.canvas.freeDrawingBrush.color = this.brushColor;
  }

  updateBrushSize(): void {
    this.canvas.freeDrawingBrush.width = this.brushSize;
  }

  handleUpload(files: FileList): void {
    let url = URL.createObjectURL(files[0]);
    let dashboard = this;
    fabric.Image.fromURL(url, function(img) {
      dashboard.canvas.add(img);
      dashboard.enableResize();
      dashboard.pushFileToDatabase(files[0]).then(
          res => {
            res.ref.getDownloadURL().then(newUrl => {
              img.setSrc(newUrl);
            });
            img.crossOrigin="anonymous";
            this.save();
          }, err => {
            console.error("An error occurred while uploading the file!");
            console.error(err);
          }
        );
      });
  }

  pushFileToDatabase(file: File): AngularFireUploadTask {
    return this._loader.pushImage(this.userData.uid, file);
  }

  enableResize() {
    this.canvas.isDrawingMode = !this.canvas.isDrawingMode;
    this.resizeMode = this.canvas.isDrawingMode ? "Enable Resize" : "Disable Resize";
    if (!this.canvas.isDrawingMode) {
      document.getElementById("brush-color").setAttribute("disabled", "true");
      document.getElementById("brush-size").setAttribute("disabled", "true");
    } else {
      document.getElementById("brush-color").removeAttribute("disabled");
      document.getElementById("brush-size").removeAttribute("disabled");
    }
  }

  clearCanvas() {
    this.canvas.clear();
    this.save();
  }
}
