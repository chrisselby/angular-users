import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private router: Router
    ) { }

    public isAuthenticated(): boolean {
        var authInfo = localStorage.getItem('authorizedUser');
        if(authInfo) {
            // TODO: If you want to log user out after a certain amount of time
            // if(JSON.parse(authInfo).expiry <= new Date().valueOf()) {
            //     alert('You\'ve been logged out due to inactivity.');
            //     return false;
            // }
            return true;
        }
        return false;
    }

    public logout(): void {
        localStorage.removeItem('authorizedUser');
        this.router.navigate(['login']);
    }

    public authUsername(): string {
        if(localStorage.getItem('authorizedUser')) {
            const jsonUser = JSON.parse(localStorage.getItem('authorizedUser'));
            return jsonUser.first_name + ' ' + jsonUser.last_name;
        }
        return '';
    }
}
