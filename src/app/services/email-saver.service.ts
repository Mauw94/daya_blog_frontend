import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from './constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailSaverService {

  constructor(private http: HttpClient) { }

  emailList = [];

  addEmail(email: String): void {
    this.emailList.push(email);
    this.saveEmailOnTheServer(email);
  }

  showEmailList(): String[] {
    return this.emailList;
  }

  checkIfTheEmailListHasItems(): boolean {
    if (this.emailList != null) {
      return true;
    } else {
      return false;
    }
  }

  private saveEmailOnTheServer(email) {
    return this.http.post(Constants.getAPiUrl() + 'saveEmail', { email: email });
  }
}
