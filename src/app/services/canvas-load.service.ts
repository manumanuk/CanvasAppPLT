import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { UserCanvas } from'./user-canvas';
import { fabric } from 'fabric';

@Injectable({
  providedIn: 'root'
})

export class CanvasLoadService {

  private dbRead: {[key: string] : UserCanvas};
  private databasePath: string = "/canvases";
  private databaseRef: AngularFireObject<{[key: string] : UserCanvas}>;

  constructor(private _db: AngularFireDatabase) {
    this.databaseRef = _db.object(this.databasePath);
    this.databaseRef.valueChanges().subscribe(data => {
      this.dbRead = data;
    });
  }

  loadCached(id: string): string {
    let userData = "";
    for(const data in this.dbRead) {
      if(this.dbRead[data].id == id) {
        userData = this.dbRead[data].canvas.toString();
      }
    }
    return userData;
  }
  
  saveData(id: string, data:string) {
    let userKey:string = "";
    for(const data in this.dbRead) {
      if(this.dbRead[data].id == id) {
        userKey = data;
      }
    }
    if (userKey=="") {
      this._db.list(this.databasePath).push({id: id, canvas: data});
    } else {
      this._db.list(this.databasePath).set(userKey, {id: id, canvas: data});
    }
  }
}
