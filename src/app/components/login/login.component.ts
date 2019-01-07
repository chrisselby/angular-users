import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Login } from '../../models/login';
import { AppComponent } from '../../app.component';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
    // @Input() login: Login;
    login = new Login(null, null);
    loginError = false;

    constructor(
        private router: Router,
        private app: AppComponent
    ) { }

    onSubmit(): void {
        console.log(this.login);
        if(this.login.email === "a@a.com" && this.login.password === "aa") {
            let date = new Date();
            let expiryDate = date.setMinutes(date.getMinutes() + 1);
            localStorage.setItem('authorizedUser', JSON.stringify({
                email: this.login.email,
                first_name: 'Test',
                last_name: 'User',
                expiry: expiryDate
            }));
            this.app.checkAuth();
            // TODO: If you want to log user out after a certain amount of time
            // this.app.startAuthInterval();
            this.router.navigate(['users']);
        }
        else {
            this.loginError = true;
        }
    }

    ngOnInit() {

    }

}
