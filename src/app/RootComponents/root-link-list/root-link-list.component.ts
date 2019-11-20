import { Component, OnInit } from '@angular/core';
import { GroupService, AuthenticationService } from './../../_services';
import { Group, GroupLink } from './../../_models';

/**
 * Author : Lucas Pauzies
 *
 * Component to display existing links between groups and global groups as list
 *
 */
@Component({
  selector: 'app-root-link-list',
  templateUrl: './root-link-list.component.html',
  styleUrls: ['./root-link-list.component.css']
})
export class RootLinkListComponent implements OnInit {

  groupLinkedList: Array<GroupLink>;
  globalGroupList: Array<Group>;

  constructor(
    private groupService: GroupService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.groupLinkedList = [];
    this.groupService.getAllGlobalGroups().then(data => {
      this.globalGroupList = data.map(
        e => new Group(e.id, e.label)
      );
      this.globalGroupList.forEach(group => {
        this.groupService.getAllGroupForAGlobalGroup(group.id).then(data => {
          this.groupLinkedList = this.groupLinkedList.concat(data.map(
            e => new GroupLink(group.label, e["group"]["label"], group.id, e["group"]["id"])
          ).filter(
            groupLink => groupLink.isNotNull()
          ))
        }).catch(error => {
          if (error.status == 401) {
            this.authenticationService.tokenExpires();
          }
        });
      });
    }).catch(error => {
      if (error.status == 401) {
        this.authenticationService.tokenExpires();
      }
    });
  }

  /**
   * Author : Lucas Pauzies
   *
   * @param {GroupLink} groupLink The model representing a link between group and global group
   *
   * {@link GroupService#deleteGroupLink}
   */
  deleteGroupLink(groupLink: GroupLink) {
    this.groupService.deleteGroupLink(groupLink);
    setTimeout('location.reload(true)', 100);
  }

}
