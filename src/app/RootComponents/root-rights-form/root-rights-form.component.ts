import { Component, OnInit } from '@angular/core';

import { Admin } from '../../_models';

import { AdminService, AuthenticationService } from '../../_services';

/**
 * Author : Lucas Pauzies
 *
 * Component to display the form of the rights modification
 *
 */
@Component({
  selector: 'app-root-rights-form',
  templateUrl: './root-rights-form.component.html',
  styleUrls: ['./root-rights-form.component.css']
})
export class RootRightsFormComponent implements OnInit {

  adminList: Array<Admin>;
  hasError: boolean;

  constructor(
    private adminService: AdminService,
    private authenticationService: AuthenticationService
  ) {
    this.hasError = false;
  }

  ngOnInit() {
    this.adminService.getAdministration().subscribe(data => {
      this.adminList = data.map(
        e => new Admin(e.login,e.admin_right)
      )
    }, error => {
      if (error.status == 401) this.authenticationService.tokenExpires();
    });
  }

  changeRightsForThisAdmin(login: string, right: string) {
    if (login != "") {
      this.adminService.changeRightsForThisAdmin(login, right);
      setTimeout('location.reload()',100);
    } else {
      this.hasError = true;
    }

  }

}
