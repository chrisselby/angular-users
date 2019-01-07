import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { UsersComponent } from './components/users/users.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { LoginComponent } from './components/login/login.component';

import { CurrencyPipe } from './pipes/currency.pipe';
import { UserAddressPipe } from './pipes/address.pipe';

import { AppRoutingModule } from './app-routing.module';

import { AuthService } from './services/auth/auth.service';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';
import { UserSearchComponent } from './components/user-search/user-search.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        UsersComponent,
        UserDetailComponent,

        CurrencyPipe,
        UserAddressPipe,
        UserSearchComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        FormsModule,
        HttpClientModule
    ],
    providers: [
        AuthService,
        AuthGuardService
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
