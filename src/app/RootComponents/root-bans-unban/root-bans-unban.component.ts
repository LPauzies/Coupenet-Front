import { Component, OnInit , Input} from '@angular/core';

import {AlumniService, AuthenticationService } from '../../_services';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import { Group } from './../../_models';
/**
 * Author : Lucas Pauzies
 *
 * Component to display root rights changement feature {RootBansMainComponent} {RootBansMainComponent}
 *
 */
@Component({
  selector: 'app-root-bans-unban',
  templateUrl: './root-bans-unban.component.html',
  styleUrls: ['./root-bans-unban.component.css']
})
export class RootBansUnbanComponent implements OnInit {

  private _success = new Subject<string>();
  successMessage: string;

  @Input() group: Group;
  constructor(
    private alumniService: AlumniService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(50000)
    ).subscribe(() => this.successMessage = null);
  }

  unbanAllForThisGroup() {
    this.alumniService.unbanAllForAGroup(this.group.id);
    this._success.next(`Groupe correctement débanni !`);
    setTimeout(function(){
      location.reload();
    }, 2000);
  }

}
