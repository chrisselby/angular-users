import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
    debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { User } from '../../models/user';
import { UserService } from '../../services/user/user.service';

@Component({
    selector: 'app-user-search',
    templateUrl: './user-search.component.html',
    styleUrls: ['./user-search.component.sass']
})
export class UserSearchComponent implements OnInit {
    users$: Observable<User[]>;
    initialUsers: User[];
    private searchTerm = new Subject<string>();

    constructor(
        private userService: UserService
    ) { }

    search(query: string): void {
        this.searchTerm.next(query);
    }

    ngOnInit() {
        this.users$ = this.searchTerm.pipe(
            // wait 300ms after each keystroke before considering the term
            debounceTime(300),

            // ignore new term if same as previous term
            distinctUntilChanged(),

            // switch to new search observable each time the term changes
            switchMap((query: string) => this.userService.searchUsers(query)),
        );
        setTimeout(this.search.bind(this, ' '), 1);
    }

}
