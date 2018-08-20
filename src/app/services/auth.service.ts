import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getTokenFromStorage(): string {
    if (localStorage.getItem('currentUser') === null) {
      return '';
    } else {
      const currentuser = JSON.parse(localStorage.getItem('currentUser'));
      const token = currentuser.token;
      return token;
    }
  }
}
