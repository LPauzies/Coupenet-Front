import { Component, OnInit } from '@angular/core';
import { GroupService, AuthenticationService } from './../../_services';
import { Group } from './../../_models';

/**
 * Author : Lucas Pauzies
 *
 * Component to display form to link group and global groups
 *
 */
@Component({
  selector: 'app-root-link-form',
  templateUrl: './root-link-form.component.html',
  styleUrls: ['./root-link-form.component.css']
})
export class RootLinkFormComponent implements OnInit {
  globalGroupList: Array<Group>;
  groupList: Array<Group>;
  hasError: boolean = false;
  hasErrorDelete: boolean = false;

  constructor(
    private groupService: GroupService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.groupService.getAllGlobalGroups().then(data => {
      this.globalGroupList = data.map(
        e => new Group(e.id, e.label)
      )
    }).catch(error => {
      if (error.status == 401) {
        this.authenticationService.tokenExpires();
      }
    });
    this.groupService.getAllGroups().then(data => {
      this.groupList = data.map(
        e => new Group(e.id, e.label, e.arel_id)
      );
    }).catch(error => {
      if (error.status == 401) {
        this.authenticationService.tokenExpires();
      }
    });
  }

  /**
   * Author : Lucas Pauzies
   *
   * @param {number} globalGroup The id of a global group
   * @param {number} group The id of a group
   *
   * {@link GroupService#linkGroups}
   */
  linkGroups(globalGroup: number, group: number) {
    if (globalGroup.toString() != "" && group.toString() != "") {
      this.groupService.linkGroups(globalGroup, group);
      setTimeout('location.reload()', 100);
    } else {
      this.hasError = true;
    }
  }

  deleteGlobalGroup(globalGroup: number) {
    if (globalGroup.toString() != "") {
      this.groupService.deleteGlobalGroup(globalGroup);
      setTimeout('location.reload()', 100);
    } else {
      this.hasErrorDelete = true;
    }
  }

}
