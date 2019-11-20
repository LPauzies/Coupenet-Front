import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from '../../environments/environment';

import { GroupLink, Group } from './../_models';

import { AuthenticationService } from './authentication.service';

/**
 * Author : Lucas Pauzies
 *
 * Group service, used to get group data from our API
 *
 */
@Injectable({ providedIn: 'root' })
export class GroupService {
  private API_URL: string;
  private defaultHttpOptions: Object;

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
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
   * Request : get all groups
   *
   * @returns `Promise<Array<Group>` to get data from the request above
   */
  public getAllGroups(): Promise<Array<Group>> {
    return this.http.get<any>(this.API_URL + "/group", this.defaultHttpOptions).toPromise();
  }

  public getAllBannedGroups(): Promise<Array<Group>> {
    return this.http.get<any>(this.API_URL + "/group/ban",
    this.defaultHttpOptions).toPromise();
  }

  /**
   * Author : Lucas Pauzies
   *
   * Request : get all global groups
   *
   * @returns `Promise<Array<Group>` to get data from the request above
   */
  public getAllGlobalGroups(): Promise<Array<Group>> {
    return this.http.get<any>(this.API_URL + "/global_group", this.defaultHttpOptions).toPromise();
  }

  /**
   * Author : Lucas Pauzies
   *
   * Request : get all global groups
   *
   * @returns `Promise<Array<Group>` to get data from the request above
   */
  public getGroup(idGroup: number): Promise<Group> {
    return this.http.get<any>(this.API_URL + "/group/" + idGroup, this.defaultHttpOptions).toPromise();
  }

  public getGroupBanStatus(idGroup: number): Promise<any> {
    return this.http.get<any>(this.API_URL + "/group/ban/status/" + idGroup, this.defaultHttpOptions).toPromise();
  }

  /**
   * Author : Lucas Pauzies
   *
   * Request : get all groups belonging to global group as input
   *
   * @param {number} globalGroupId The id of the global group
   *
   * @returns `Promise<Array<Group>` to get data from the request above
   */
  public getAllGroupForAGlobalGroup(globalGroupId: number): Promise<Array<Group>> {
    return this.http.get<any>(this.API_URL + "/global_group/group/" + globalGroupId, this.defaultHttpOptions).toPromise();
  }

  /**
   * Author : Lucas Pauzies
   *
   * Request : Delete the link between a global group and a group
   *
   * @param {GroupLink} groupLink The groupLink to delete
   */
  public deleteGroupLink(groupLink: GroupLink): void {
    this.http.delete(this.API_URL + "/group_global_group/" + groupLink.idGlobalGroup + "/" + groupLink.idGroup, this.defaultHttpOptions).toPromise().then(data => console.log(data));
  }

  /**
   * Author : Lucas Pauzies
   *
   * Request : Create the link between a global group and a group
   *
   * @param {number} globalGroup The id of the globalGroup
   * @param {number} group The id of the group
   */
  public linkGroups(globalGroup: number, group: number): void {
    var body = JSON.parse('{"id_global_group":' + globalGroup + ', "id_group":' + group + '}');
    this.http.post(this.API_URL + "/group_global_group", body, this.defaultHttpOptions).toPromise().then(
      data => data
    ).catch(error => {
      if (error.status == 401) {
        this.authenticationService.tokenExpires();
      }
    });
  }


  /**
    * Author : Lucas Pauzies
    *
    * Request : Add a global group
    *
    * @param {string} globalGroup The globalGroup to add
    */
  public addGlobalGroup(globalGroup: string) {
    var body = JSON.parse('{"label":"' + globalGroup + '"}');
    this.http.post(this.API_URL + "/global_group", body, this.defaultHttpOptions).toPromise().then(
      data => data
    ).catch(error => {
      if (error.status = 401) {
        this.authenticationService.tokenExpires();
      }
    });
  }

  /**
    * Author : Lucas Pauzies
    *
    * Request : Delete a global group
    *
    * @param {number} globalGroup The id of the globalGroup to delete
    */
  public deleteGlobalGroup(globalGroup: number) {
    this.http.delete(this.API_URL + "/global_group/" + globalGroup, this.defaultHttpOptions).toPromise().then(
      data => data
    ).catch(error => {
      if (error.status = 401) {
        this.authenticationService.tokenExpires();
      }
    });
  }

}
