import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../../models/user';

import { environment } from '../../../environments/environment';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private basePath = (environment.production) ? 'https://nameless-temple-18465.herokuapp.com' : 'http://localhost:3000';
    private usersPath = this.basePath + '/users';
    private filters = '?deleted=false';


    constructor(
        private http: HttpClient
    ) { }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${this.usersPath}${this.filters}`)
            .pipe(
                catchError(this.handleError('getUsers', []))
            );
    }

    getUser(id: number): Observable<User> {
        const url = `${this.usersPath}/${id}`;
        return this.http.get<User>(url)
            .pipe(
                catchError(this.handleError<User>(`getUser id=${id}`))
            );
    }

    updateUser(user: User): Observable<any> {
        const url = `${this.usersPath}/${user.id}`;
        return this.http.put(url, user, httpOptions).pipe(
            catchError(this.handleError<any>('updateHero'))
        );
    }

    deleteUser(user: User): Observable<any> {
        const url = `${this.usersPath}/${user.id}`;
        user.deleted = true;
        return this.http.put(url, user, httpOptions).pipe(
            catchError(this.handleError<any>('deleteHero'))
        );
    }

    searchUsers(query: string): Observable<User[]> {
        if (!query.trim()) {
            return this.http.get<User[]>(`${this.usersPath}${this.filters}`)
                .pipe(
                    catchError(this.handleError('getUsers', []))
                );
        }

        return this.http.get<User[]>(`${this.usersPath}${this.filters}&q=${query}`)
            .pipe(
                catchError(this.handleError('searchUsers', []))
            );
    }

    /**
    * Handle Http operation that failed.
    * Let the app continue.
    * @param operation - name of the operation that failed
    * @param result - optional value to return as the observable result
    */
    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            // this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}
