import { Component } from '@angular/core';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  title = 'LOLOLZOLZLZLLZOL';
  username = '';
  loggedIn = false;
  authInterval = null;

  constructor(
      private auth: AuthService
  ) { }

  checkAuth() {
      console.log('checking auth');
      this.loggedIn = this.auth.isAuthenticated();
      this.username = this.auth.authUsername();
      if(!this.loggedIn) {
          this.logout();
      }
  }

  startAuthInterval() {
      this.authInterval = setInterval(this.checkAuth.bind(this), 5000);
  }

  clearAuthInterval() {
      clearInterval(this.authInterval);
  }

  ngOnInit() {
      this.checkAuth.call(this);
      // TODO: If you want to log user out after a certain amount of time
      // if(this.loggedIn) {
      //     this.startAuthInterval();
      // }
  }

  logout() {
      this.clearAuthInterval();
      this.auth.logout();
      this.loggedIn = false;
  }

}
