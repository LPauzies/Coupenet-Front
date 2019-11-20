import { Component, OnInit } from '@angular/core';


import { GroupService, AuthenticationService } from './../../_services';
import { Group } from './../../_models';

/**
 * Author : Lucas Pauzies
 *
 * Component to display root rights changement feature {RootBansMainComponent} {RootBansMainComponent}
 *
 */
@Component({
  selector: 'app-root-bans-search',
  templateUrl: './root-bans-search.component.html',
  styleUrls: ['./root-bans-search.component.css']
})
export class RootBansSearchComponent implements OnInit {

  groupList: Array<Group>;
  selectedGroup: Group;

  constructor(
    private groupService: GroupService,
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit() {
    this.groupService.getAllBannedGroups().then(data => {
      this.groupList = data.map(
        e => new Group(e.id, e.label, e.arel_id)
      );
    }).catch(error => {
      if (error.status == 401) {
        this.authenticationService.tokenExpires();
      }
    });
  }

}
