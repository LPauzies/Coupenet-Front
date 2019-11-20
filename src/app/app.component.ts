import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthenticationService } from './_services';
import { User } from './_models';
import { Router } from '@angular/router';

import { VERSION } from './../environments/version';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  currentUser: User;

  version = VERSION;

  public constructor(
    private titleService: Title,
    private authenticationService: AuthenticationService,
    private router: Router) {
    this.titleService.setTitle(this.version.title);
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
