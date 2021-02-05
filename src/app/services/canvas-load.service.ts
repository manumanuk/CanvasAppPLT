import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage'
import { UserCanvas } from'./user-canvas';
import { fabric } from 'fabric';

@Injectable({
  providedIn: 'root'
})

export class CanvasLoadService {

  private dbRead: {[key: string] : UserCanvas};
  private databasePath: string = "/canvases";
  private databaseRef: AngularFireObject<{[key: string] : UserCanvas}>;
  private storageRef: AngularFireStorageReference;

  constructor(private _db: AngularFireDatabase, private _storage: AngularFireStorage) {
    this.databaseRef = _db.object(this.databasePath);
    this.databaseRef.valueChanges().subscribe(data => {
      this.dbRead = data;
    });
  }

  loadCached(id: string) {
    let userData = {};
    for(const data in this.dbRead) {
      if(this.dbRead[data].id == id) {
        userData = this.dbRead[data].canvas;
      }
    }
    return JSON.stringify(userData);
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
      this._db.list(this.databasePath).update(userKey, {id: id, canvas: data});
    }
  }

  pushImage(userId: string, file: File): AngularFireUploadTask {
    console.log('/uploads/users/' + userId + '/' + file.name);
    let path = '/uploads/users/' + userId + '/' + file.name;
    this.storageRef = this._storage.ref(path);
    // this.savePhoto(userId, path);
    return this.storageRef.put(file);
  }
}
