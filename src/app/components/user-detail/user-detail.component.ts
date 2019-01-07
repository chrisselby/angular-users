import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { User } from '../../models/user';
import { UserService }  from '../../services/user/user.service';

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

    splitAmount(input) {
        let amount = input.toString();
        let decimal = amount.substring(amount.length - 2);
        let rest = amount.substring(0, amount.length - 2);
        return rest + '.' + decimal;
    }

    getUser(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        this.userService.getUser(id)
            .subscribe(user => {
                let userInfo = user;
                userInfo.order_total.amount = Number(this.splitAmount(userInfo.order_total.amount));
                this.user = userInfo;
            });
    }

    save(): void {
        let userData = this.user;
        let splitAmount = userData.order_total.amount.toString().split('.');
        userData.order_total.amount = Number(splitAmount[0] + splitAmount[1]);
        this.userService.updateUser(userData)
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
