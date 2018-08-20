import { Injectable } from '@angular/core';
import { EmailModel } from '../models/email';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class EmailSaverService {

  constructor() { }

  today = new Date();
  jstoday;
  email: any;

  addEmail(email: string) {
    this.jstoday = formatDate(this.today, 'dd-MM-yyyy hh:mm:ss a', 'en-EU', '+0200');
    const emailToSave: EmailModel = new EmailModel(email, this.jstoday);
    return emailToSave;
  }

  returnEmail() {
    return this.email;
  }

  checkIfEmailListIsNotEmpty(): boolean {
    if (this.email != null) {
      return true;
    } else {
      return false;
    }
  }
}
