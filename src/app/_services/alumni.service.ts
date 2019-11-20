import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { Alumni, User } from '../_models';

import { AuthenticationService } from './authentication.service';

/**
 * Author : Lucas Pauzies
 *
 * Alumni service, used to get alumni data from our API
 *
 */
@Injectable({ providedIn: 'root' })
export class AlumniService {
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
     * @param {number} idGroup The id of the group to ban all student
     *
     * Ban all student from te group with id idGroup
     */
    public banAllForAGroup(idGroup: number,  startBan: string, endBan: string): void {
      var body = JSON.parse('{"start_ban":"' + startBan + '", "end_ban":"' + endBan + '"}');
      this.http.put(this.API_URL + "/group/ban/" + idGroup, body, this.defaultHttpOptions).toPromise().then((data: Array<Object>) => {
        this.authenticationService.incBanNumber(data.length);
      }).catch(error => {
        if (error.status == 401) {
          this.authenticationService.tokenExpires();
        }
      });
    }

    /**
     * Author : Lucas Pauzies
     *
     * @param {number} idGroup The id of the group to ban all student
     * @param {string} startBan The date of ban start
     * @param {string} endBan The date of ban end
     *
     * Ban all student from te group with id idGroup
     */
    public banAllForAGroupWithTimer(idGroup: number, startBan: string, endBan: string): void {
      var body = JSON.parse('{"start_ban":"' + startBan + '", "end_ban":"' + endBan + '"}');
      this.http.put(this.API_URL + "/group/ban/" + idGroup, body, this.defaultHttpOptions).toPromise().then((data: Array<Object>) => {
        this.authenticationService.incBanNumber(data.length);
      }).catch(error => {
        if (error.status == 401) {
          this.authenticationService.tokenExpires();
        }
      });
    }

    /**
     * Author : Lucas Pauzies
     *
     * @param {number} idGroup The id of the group to unban all student
     *
     * Unban all student from te group with id idGroup
     */
    public unbanAllForAGroup(idGroup: number): void {
      this.http.put(this.API_URL + "/group/unban/" + idGroup, {}, this.defaultHttpOptions).toPromise().then(
        (data: Object) => data
      ).catch(error => {
        if (error.status == 401) {
          this.authenticationService.tokenExpires();
        }
      });
    }

    /**
     * Author : Lucas Pauzies
     *
     * @param {Alumni} alumni The student to ban
     *
     * Ban the student from the network
     */
    public ban(alumni: Alumni, endBan: string): void {
      var body = JSON.parse('{"end_ban":"' + endBan + '"}');
      this.http.put(this.API_URL + "/student/ban/" + alumni.login, body, this.defaultHttpOptions).toPromise().then(
        data => this.authenticationService.incBanNumber(1)
      ).catch(error => {
        if (error.status == 401) {
          this.authenticationService.tokenExpires();
        }
      });
    }

    /**
     * Author : Lucas Pauzies
     *
     * @param {Alumni} alumni The alumni to be banned
     * @param {string} startBan The date of ban start
     * @param {string} endBan The date of ban end
     *
     * Ban all student from te group with id idGroup
     */
    public banWithTimer(alumni: Alumni, startBan: string, endBan: string): void {
      var body = JSON.parse('{"start_ban":"' + startBan + '", "end_ban":"' + endBan + '"}');
      this.http.put(this.API_URL + "/student/ban/" + alumni.login, body, this.defaultHttpOptions).toPromise().then(
        data => this.authenticationService.incBanNumber(1)
      ).catch(error => {
        if (error.status == 401) {
          this.authenticationService.tokenExpires();
        }
      });
    }

    /**
     * Author : Lucas Pauzies
     *
     * @param {Alumni} alumni The student to unban
     *
     * Unban the student from the network
     */
    public unban(alumni: Alumni): void {
      this.http.put(this.API_URL + "/student/unban/" + alumni.login, {}, this.defaultHttpOptions).toPromise().then(
        (data: Object) => data
      ).catch(error => {
        if (error.status == 401) {
          this.authenticationService.tokenExpires();
        }
      });
    }

    /**
     * Author : Lucas Pauzies
     *
     * @param {number} idGroup The id of the group we want to get the student from
     *
     * @returns `Observable<any>>` an observable of `any` where to subscribe to get live students from group idGroup
     */
    public getAllAlumniForAGroup(idGroup: number): Observable<any> {
      return this.http.get<any>(this.API_URL + "/group/student/" + idGroup, this.defaultHttpOptions);
    }

    /**
     * Author : Lucas Pauzies
     *
     * @param {number} idGroup The id of the global group we want to get the student from
     *
     * @returns `Observable<any>>` an observable of `any` where to subscribe to get live students from global group idGroup
     */
    public getAllAlumniForAGlobalGroup(idGroup: number): Observable<any> {
      return this.http.get<any>(this.API_URL + "/global_group/student/" + idGroup, this.defaultHttpOptions);
    }

}
