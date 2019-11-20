import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { Event, Alumni } from './../_models';

import { AlumniService } from './alumni.service';
import { AuthenticationService } from './authentication.service';

/**
 * Author : Lucas Pauzies
 *
 * Schedule service, used to get schedule data from our API
 *
 */
@Injectable({ providedIn: 'root' })
export class ScheduleService {

  private API_URL: string;
  private defaultHttpOptions: Object;

    constructor(
      private alumniService: AlumniService,
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
     * Request : Get the events associated to the group as input
     *
     * @param {number} group The id of a group
     *
     * @returns `Promise<Array<Event>>` to get data from the request above
     */
    public getEventsForAGroup(group: number): Promise<Array<Event>> {
      return this.http.get<any>(this.API_URL + "/planning/group/" + group, this.defaultHttpOptions).toPromise();
    }

    /**
     * Author : Lucas Pauzies
     *
     * Request : Get the events associated to the group as input
     *
     * @param {number} group The id of a group
     *
     * @returns `Promise<Array<Event>>` to get data from the request above
     */
    public getEventsForAGlobalGroup(group: number): Promise<Array<Event>> {
      return this.http.get<any>(this.API_URL + "/planning/global_group/" + group, this.defaultHttpOptions).toPromise();
    }


    /**
    * Author : Lucas Pauzies
    *
    * Request : Get the events associated to the login as input
    *
    * @param {string} login The login of the connected user
    *
    * @returns `Promise<Array<Event>` to get data from the request above
    */
    public getEventsForThisTeacher(login: string): Promise<Array<Event>> {
      return this.http.get<any>(this.API_URL + "/planning/administration/" + login, this.defaultHttpOptions).toPromise();
    }

}
