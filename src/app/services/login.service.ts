import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from "firebase/app";
import { Observable } from 'rxjs';
import { Router } from "@angular/router"

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public user: Observable<firebase.default.User>;

  constructor(private _firebaseAuth: AngularFireAuth, private _router: Router) {
    this.user = _firebaseAuth.authState;
  }

  login() {
    return this._firebaseAuth.signInWithPopup(
      new firebase.default.auth.GoogleAuthProvider()
      ).then((res) => {
          this._router.navigate(["/dashboard"]);
        }, err => {
          console.error("A login error occurred: " + err);
        }
      );
  }

  logout() {
    return this._firebaseAuth.signOut().then(
      res => {
        this._router.navigate(["/"]);
      }, err => {
        console.error("Could not log out: " + err);
    });
  }
}
