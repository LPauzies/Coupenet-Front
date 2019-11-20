import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";

import { environment } from '../../environments/environment';

import { User } from '../_models';

/**
 * Author : Lucas Pauzies
 *
 * Authentication service, used to get login data from our API
 *
 */
@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    private API_URL: string;
    private defaultHttpOptions: Object;

    constructor(
      public http: HttpClient,
      private router: Router
    ) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
        this.API_URL = environment.api;
        this.defaultHttpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Headers': 'Content-Type'
          })
        };
    }

    /**
     * Author : Lucas Pauzies
     *
     * @returns the current connected user
     */
    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    /**
     * Author : Lucas Pauzies
     *
     * Try to login the input user
     *
     * @param {string} username  The username to consider for the login
     * @param {string} password  The password associated
     * @returns the connected user if connected, else null
     */
    public login(username: string, password: string): Promise<any> {
      var body = JSON.parse('{"username":"' + username + '", "password":"' + password + '"}');
      return this.http.post(this.API_URL + "/login", body, this.defaultHttpOptions).toPromise();
    }

    /**
     * Author : Lucas Pauzies
     *
     * Logout the current logged in user
     */
    public logout() {
      this.removeLocalStorageCurrentUser();
      this.router.navigate(['/login']);
    }

    /**
     * Author : Lucas Pauzies
     *
     * Logout the current logged in user because his token has expired
     */
    public tokenExpires() {
      this.removeLocalStorageCurrentUser();
      this.router.navigate(['/login'], { queryParams : { hasExpired: true }});
    }

    /**
     * Author : Lucas Pauzies
     *
     * Increase ban number for currentUser with value
     *
     * @param {number} value The value to add to the ban number of the user
     */
    public incBanNumber(value: number) {
      var currentUser = this.currentUserValue;
      currentUser.banNumber += value;
      this.setLocalStorageCurrentUser(currentUser);
    }

    /**
     * Author : Lucas Pauzies
     *
     * Remove locally the data from current connected user
     */
    public removeLocalStorageCurrentUser() {
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
    }

    /**
     * Author : Lucas Pauzies
     *
     * @param {User} user The user to save locally during this session
     *
     * Set locally the data from new user
     */
    public setLocalStorageCurrentUser(user: User) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
    }

}
