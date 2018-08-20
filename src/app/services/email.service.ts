import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from './constants';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) { }

  saveEmail(email: any) {
    return this.http.post(Constants.getAPiUrl() + 'emails', email).pipe(map((res: Response) => {
      if (res) {
        if (res.status === 200) {
          return 'Succes';
        }
      } else {
        return 'An error occured';
      }
    }));
  }
}
