import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';

import { UsersComponent } from './components/users/users.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { LoginComponent } from './components/login/login.component';

import { AuthService } from './services/auth/auth.service';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'users',
        component: UsersComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'users/:id',
        component: UserDetailComponent,
        canActivate: [AuthGuardService]
    }
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
