import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { User } from '../../models/user';
import { UserService }  from '../../user.service';

@Component({
    selector: 'app-user-detail',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.sass']
})
export class UserDetailComponent implements OnInit {
    @Input() user: User;

    constructor(
        private route: ActivatedRoute,
        private userService: UserService,
        private router: Router
    ) {}

    getUser(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        this.userService.getUser(id)
            .subscribe(user => this.user = user);
    }

    save(): void {
        this.userService.updateUser(this.user)
            .subscribe(() => this.cancel());
    }

    delete(): void {
        if(window.confirm('You sure bro?')) {
            this.userService.deleteUser(this.user)
                .subscribe(() => this.cancel());
        }
    }

    cancel(): void {
        this.router.navigateByUrl('users');
    }

    ngOnInit(): void {
        this.getUser();
    }

}
