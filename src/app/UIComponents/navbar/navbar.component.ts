import { Component, OnInit } from '@angular/core';

import { VERSION } from './../../../environments/version';

import { AuthenticationService } from  '../../_services';
import { User } from '../../_models';

/**
 * Author : Lucas Pauzies
 *
 * UI Component as navbar for the app, behaviour can change case of connected user
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  version = VERSION;
  currentUser: User;

  /**
   * Author : Lucas Pauzies
   *
   * {@link AuthenticationService#currentUserValue}
   */
  constructor(
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  /**
   * Author : Lucas Pauzies
   *
   * Disconnect the current user by clicking on this button
   *
   * {@link AuthenticationService#logout}
   */
  logout() {
    this.authenticationService.logout();
  }

}
