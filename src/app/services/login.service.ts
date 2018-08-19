import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { Constants } from './constants';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public token: String;

  constructor(private http: Http) { }

  login(user: User): Observable<Boolean> {
    return this.http.post(Constants.getAPiUrl() + 'signin', {
      'email': user.email,
      'password': user.password
    }).pipe(map((response: Response) => {
      const token = response.json() && response.json().token;
      if (token) {
        this.token = token;
        localStorage.setItem('currentUser', JSON.stringify({ token: token }));
        return true;
      } else {
        return false;
      }
    }), catchError(this.onError));
  }

  create(user: User): Observable<any> {
    return this.http.post(Constants.getAPiUrl() + 'signup', {
      'email': user.email,
      'password': user.password
    }).pipe(map((response: Response) => {
      const token = response.json() && response.json().token;
      if (token) {
        this.token = token;
        localStorage.setItem('currentUser', JSON.stringify({ token: token }));
        return true;
      } else {
        return false;
      }
    }), catchError(this.onSignUpError));
  }

  onError(res: Response): Observable<any> {
    const error = `Error ${res.status}: ${res.statusText}`;
    console.log(error);
    return Observable.throw('Unauthorized');
  }

  onSignUpError(res: Response): Observable<any> {
    const error = `Error ${res.status}: ${res.statusText}`;
    console.log(error);
    return Observable.throw('EmailInUse');
  }
}
