import { Component, OnInit } from '@angular/core';

import { AdminService, AuthenticationService } from '../../_services';

import { Admin } from '../../_models';

/**
 * Author : Lucas Pauzies
 *
 * Component to display list of admins
 *
 */
@Component({
  selector: 'app-root-rights-list',
  templateUrl: './root-rights-list.component.html',
  styleUrls: ['./root-rights-list.component.css']
})
export class RootRightsListComponent implements OnInit {

  adminList: Array<Admin>;

  constructor(
    private adminService: AdminService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.adminService.getAdministration().subscribe(data => {
      this.adminList = data.map(
        e => new Admin(e.login,e.admin_right)
      )
    }, error => {
      if (error.status == 401) this.authenticationService.tokenExpires();
    });
  }

}
