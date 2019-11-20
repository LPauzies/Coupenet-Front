import { Component, Input, OnInit } from '@angular/core';
import { AlumniService, GroupService, AuthenticationService } from '../../_services';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';


/**
 * Author : Lucas Pauzies
 *
 * Component used to ban all or unban all student from a group
 *
 */
@Component({
  selector: 'app-root-red-button',
  templateUrl: './root-red-button.component.html',
  styleUrls: ['./root-red-button.component.css']
})
export class RootRedButtonComponent implements OnInit {

  msgBanAllButton: string = "Bannir tous les élèves de ce cours";
  msgUnbanAllButton: string = "Débannir tous les élèves de ce cours";
  groupLabel: string;
  startTime = { hour: 0, minute : 0};
  endTime = {hour: 0, minute : 0};
  spinners = false;

  private _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage: string;

  @Input() idGroup: number;
  @Input() startDate: string;
  @Input() endDate: string;
  constructor(
    private alumniService: AlumniService,
    private groupService: GroupService,
    private authenticationService: AuthenticationService
  ) { }


  ngOnInit() {

    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(2000)
    ).subscribe(() => this.successMessage = null);

    this.reworkDate();
    this.groupService.getGroup(this.idGroup).then(data => {
      this.groupLabel = data.label;
    }).catch(error => {
      if (error.status == 401) {
        this.authenticationService.tokenExpires();
      }
    });
    let startTimeParse = this.startDate.split("T").pop().slice(0,-3).split(":");
    this.startTime = {hour: parseInt(startTimeParse[0]), minute: parseInt(startTimeParse[1])};
    let endTimeParse = this.endDate.split("T").pop().slice(0,-3).split(":");
    this.endTime = {hour: parseInt(endTimeParse[0]), minute: parseInt(endTimeParse[1])};
  }

  /*getStartHour() {

  }*/

  /**
   * Author : Lucas Pauzies
   *
   * {@link AlumniService#banAllForAGroup}
   */
  banAllForThisGroup() {
    let start = new Date(this.startDate);
    let dateStart = new Date(start.getFullYear(), start.getMonth(), start.getDate(), this.startTime.hour + 2, this.startTime.minute);
    this.startDate = dateStart.toISOString();
    let end = new Date(this.endDate);
    let dateEnd = new Date(end.getFullYear(), end.getMonth(), end.getDate(), this.endTime.hour + 2, this.endTime.minute);
    this.endDate = dateEnd.toISOString();
    this.alumniService.banAllForAGroup(this.idGroup, this.startDate, this.endDate);
    this._success.next(`Groupe ${ this.groupLabel } correctement banni !`);
    document.getElementById("status").className = "circleAllBanned";
  }

  /**
   * Author : Lucas Pauzies
   *
   * {@link AlumniService#unbanAllForAGroup}
   */
  unbanAllForThisGroup() {
    this.alumniService.unbanAllForAGroup(this.idGroup);
    this._success.next(`Groupe ${ this.groupLabel } correctement débanni !`);
    document.getElementById("status").className = "circleNoBan";
  }

  private reworkDate() {
    var dateEnd = new Date(this.endDate);
    var dateStart = new Date(this.startDate);
    this.endDate = dateEnd.toISOString();
    this.startDate = dateStart.toISOString();
  }

}
