import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn = false;

  constructor() { }

  getTokenFromStorage(): string {
    if (localStorage.getItem('currentUser') === null) {
      return '';
    } else {
      const currentuser = JSON.parse(localStorage.getItem('currentUser'));
      const token = currentuser.token;
      this.loggedIn = true;
      return token;
    }
  }

  isLoggedIn(): boolean {
    if (localStorage.getItem('currentUser') != null) {
      console.log('logged in');
      return true;
    } else {
      return false;
    }
  }
}
