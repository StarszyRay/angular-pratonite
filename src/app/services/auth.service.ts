import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import {Inject} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

export class AuthService {

  private isAuthenticated = new BehaviorSubject<boolean>(false);

  constructor(
    @Inject(AngularFireAuth) private angularFireAuth: AngularFireAuth
  ) {
    this.angularFireAuth.auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
    this.angularFireAuth.authState.subscribe( user => {
        // console.log(`isLoggedIn? ${user}`);
        if (user) {
          this.isAuthenticated.next(true);
        } else {
          this.isAuthenticated.next(false);
        }
      }, err => {
        console.log(err.toString());
      });
  }

  isLoggedIn() {
    return this.isAuthenticated.asObservable();
  }

  doEmailRegister(userData) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(userData.email, userData.password)
        .then( res => {
          resolve(res);
        }, err => reject(err));
    });
  }


  doEmailLogin(email: string, password: string) {
    return new Promise<any>((resolve, reject) => {
      this.angularFireAuth.auth.signInWithEmailAndPassword(email, password)
        .then(res => {
          resolve(res);
        }, err => {
          console.log(err);
          reject(err);
        });
    });
  }

  doGoogleLogin() {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.GoogleAuthProvider();
      this.angularFireAuth.auth
        .signInWithPopup(provider)
        .then(res => {
          resolve(res);
        }, err => {
          console.log(err);
          reject(err);
        });
    });
  }

  logout() {
    return this.angularFireAuth.auth.signOut();
  }
}
