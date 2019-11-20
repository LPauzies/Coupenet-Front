import { Component, Input, OnInit, ElementRef } from '@angular/core';

import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { environment } from './../../../environments/environment';

import { AlumniService, AuthenticationService, GroupService } from './../../_services';

import { Alumni } from './../../_models';

/**
 * Author : Lucas Pauzies
 *
 * Component to display modal to ban, unban or check one by one
 *
 */
@Component({
  selector: 'info-modal-all-alumni',
  template: `
      <div class="modal-header" style="min-width: 500px;">
        <h3 class="modal-title">Liste des élèves pour le cours : {{ event.title }}</h3>
        <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body bg-light">
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="checkbox" name="FilterBanRadio" id="FilterBanRadio" value="ban" (click)="manageIfOnlyOneRadioButtonSelected($event)">
        <label class="form-check-label" for="FilterBanRadio">Bannis</label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="checkbox" name="FilterUnBanRadio" id="FilterUnBanRadio" value="unban" (click)="manageIfOnlyOneRadioButtonSelected($event)">
        <label class="form-check-label" for="FilterUnBanRadio">Non Bannis</label>
      </div>
        <ul class="list-group">
          <app-root-alumni *ngFor="let alumni of allAlumniForThisGroup" [endDate]="event.end" [alumni]="alumni" [filterBanned]="getRadioButtonFilterBanValue()" [filterUnbanned]="getRadioButtonFilterUnbanValue()"></app-root-alumni>
        </ul>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-dark" (click)="commitBanishments()">Fermer</button>
      </div>
  `
})
export class InfoModalAllAlumni implements OnInit {

  allAlumniForThisGroup: Array<Alumni>;


  @Input() event: any;
  @Input() idGroup: number;
  constructor(
    public activeModal: NgbActiveModal,
    private alumniService: AlumniService,
    private authenticationService: AuthenticationService,
    private elementRef: ElementRef
  ) { }

  ngOnInit() {
      this.alumniService.getAllAlumniForAGroup(this.idGroup).subscribe(data => {
        this.allAlumniForThisGroup = data.map(
          e => new Alumni(e.student.login, e.student.first_name, e.student.last_name, e.student.ban, e.student.arel_id)
        );
      }, error => {
        if (error.status == 401) {
          this.authenticationService.tokenExpires();
        }
      });
    }

  /**
   * Author : Lucas Pauzies
   *
   * @returns The value of the input checkbox with id `FilterBanRadio`
   */
  getRadioButtonFilterBanValue() {
    return this.elementRef.nativeElement.querySelector("#FilterBanRadio").checked;
  }

  /**
   * Author : Lucas Pauzies
   *
   * @returns The value of the input checkbox with id `FilterUnBanRadio`
   */
  getRadioButtonFilterUnbanValue() {
    return this.elementRef.nativeElement.querySelector("#FilterUnBanRadio").checked;
  }

  /**
   * Author : Lucas Pauzies
   *
   * @param {event} event Click event
   *
   * Modify the status of checked checkbox and avoid having two checkbox checked at the same time
   */
  manageIfOnlyOneRadioButtonSelected(event) {
    var currentElement =  event.srcElement.id;
    var isChecked = event.srcElement.checked;
    if (currentElement == "FilterBanRadio" && isChecked) {
      this.elementRef.nativeElement.querySelector("#FilterUnBanRadio").checked = false;
    } else if (currentElement == "FilterUnBanRadio" && isChecked) {
      this.elementRef.nativeElement.querySelector("#FilterBanRadio").checked = false;
    }
  }

  /**
   * Author : Lucas Pauzies
   *
   * Close the modal and reload the page to refresh data
   */
  commitBanishments() {
    this.activeModal.close('close');
  }
}

/**
 * Author : Lucas Pauzies
 *
 * Component to display description of the group selected in full calendar
 *
 */
@Component({
  selector: 'app-root-group-description',
  templateUrl: './root-group-description.component.html',
  styleUrls: ['./root-group-description.component.css']
})
export class RootGroupDescriptionComponent implements OnInit {

  groupLabel: string;
  statusBan: number;

  @Input() event: any;
  @Input() idGroup: string;
  constructor(
    private modalService: NgbModal,
    private groupService: GroupService,
    private authenticationService: AuthenticationService
  ) {
  }

  ngOnInit() {
    this.groupService.getGroup(+this.idGroup).then(data => {
      this.groupLabel = data.label;
    }).catch(error => {
      if (error.status == 401) {
        this.authenticationService.tokenExpires();
      }
    });
    this.groupService.getGroupBanStatus(+this.idGroup).then(data => {
      this.statusBan = data.status;
      console.log(this.statusBan);
    }).catch(error => {
      if (error.status == 401) {
        this.authenticationService.tokenExpires();
      }
    });
  }

  /**
   * Author : Lucas Pauzies
   *
   * Open the modal for current opened group
   */
  open() {
    history.pushState(null, null, environment.domain + '/root');
    const modal = this.modalService.open(InfoModalAllAlumni, { size: 'lg'});
    modal.componentInstance.event = this.event;
    modal.componentInstance.idGroup = +this.idGroup;
  }

}
