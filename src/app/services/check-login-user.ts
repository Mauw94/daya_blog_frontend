import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CheckLoginUserService {

    user_is_logged_in = false;

    constructor() { }

    checkIfUserIsLoggedIn() {
        this.checkLoggedInUserStatus();
        return this.user_is_logged_in;
    }

    checkLoggedInUserStatus() {
        if (localStorage.getItem('currentUser') != null) {
            this.user_is_logged_in = true;
        } else {
            this.user_is_logged_in = false;
        }
        return this.user_is_logged_in;
    }

    returnCheckLoginStatus() {
        return this.user_is_logged_in;
    }
}
