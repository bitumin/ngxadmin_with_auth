import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

import { Observable } from 'rxjs';


@Injectable()
export class AuthService {
  public user: Observable<firebase.User | null>;

  constructor(
    private afAuth: AngularFireAuth,
    private afDb: AngularFireDatabase,
    private router: Router,
  ) {
    this.user = this.afAuth.user;
  }

  // OAuth Methods
  // noinspection JSUnusedGlobalSymbols
  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  // noinspection JSUnusedGlobalSymbols
  githubLogin() {
    const provider = new firebase.auth.GithubAuthProvider();
    return this.oAuthLogin(provider);
  }

  // noinspection JSUnusedGlobalSymbols
  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.oAuthLogin(provider);
  }

  // noinspection JSUnusedGlobalSymbols
  twitterLogin() {
    const provider = new firebase.auth.TwitterAuthProvider();
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider: any) {
    return this.afAuth.auth
      .signInWithPopup(provider)
      .catch(error => this.handleError(error));
  }

  // Anonymous Auth
  // noinspection JSUnusedGlobalSymbols
  anonymousLogin() {
    return this.afAuth.auth
      .signInAnonymously()
      .catch(error => {
        this.handleError(error);
      });
  }

  // Email/Password Auth
  // noinspection JSUnusedGlobalSymbols
  emailSignUp(email: string, password: string) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .catch(error => this.handleError(error));
  }

  /**
   * @param {string} email
   * @param {string} password
   * @returns {Promise<void>}
   */
  emailLogin(email: string, password: string) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
  }

  // Sends email allowing user to reset password
  // noinspection JSUnusedGlobalSymbols
  resetPassword(email: string) {
    const fbAuth = firebase.auth();

    return fbAuth
      .sendPasswordResetEmail(email)
      .catch(error => this.handleError(error));
  }

  signOut() {
    return this.afAuth.auth.signOut().then(() => {
      return this.router.navigate(['/auth/login']);
    });
  }

  // If error, console log and notify user
  // noinspection JSMethodCanBeStatic
  private handleError(error: Error) {
    console.error(error);
  }

}
