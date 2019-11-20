import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { Alumni, User } from '../_models';

import { AuthenticationService } from './authentication.service';

/**
 * Author : Lucas Pauzies
 *
 * Admin service, used to get and interact with admin people from API
 *
 */
@Injectable({ providedIn: 'root' })
export class AdminService {
    private API_URL: string;
    private defaultHttpOptions: Object;

    constructor(
      private authenticationService: AuthenticationService,
      private http: HttpClient
    ) {
      this.API_URL = environment.api;
      this.defaultHttpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Authorization': 'Bearer ' + this.authenticationService.currentUserValue.token
        })
      };
    }

    /**
     * Author : Lucas Pauzies
     *
     * @returns `Observable<any>>` an observable of `any` where to subscribe to get admin people
     */
    public getAdministration(): Observable<any> {
      return this.http.get<any>(this.API_URL + "/administration", this.defaultHttpOptions);
    }

    /**
     * Author : Lucas Pauzies
     *
     * @param {string} login The login of the admin people to change
     * @param {string} right The right to give to the admin people as input
     *
     */
    public changeRightsForThisAdmin(login: string, right: string): void {
      this.http.put(this.API_URL + "/administration/" + login + "/" + right, {}, this.defaultHttpOptions).toPromise().then(
        data => data
      ).catch(
        error => {
          if (error.status == 401) this.authenticationService.tokenExpires();
        }
      );
    }

}
