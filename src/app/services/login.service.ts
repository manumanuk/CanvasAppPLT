import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from "firebase/app";

const SCOPES = [];

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _firebaseAuth: AngularFireAuth) { }

  login() {
    return this._firebaseAuth.signInWithPopup(
      new firebase.default.auth.GoogleAuthProvider().addScope(SCOPES.join(', '))
      ).then((res) => {
        }, err => {
          console.error("A login error occurred: " + err);
        }
      );
  }
}
