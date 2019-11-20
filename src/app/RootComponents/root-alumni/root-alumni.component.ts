import { Component, OnInit, Input } from '@angular/core';
import { Alumni } from '../../_models';

import { AlumniService } from '../../_services';

/**
 * Author : Lucas Pauzies
 *
 * Component to display a single alumni and manage his behaviour
 *
 */
@Component({
  selector: 'app-root-alumni',
  templateUrl: './root-alumni.component.html',
  styleUrls: ['./root-alumni.component.css']
})
export class RootAlumniComponent implements OnInit {

  @Input() alumni: Alumni;
  @Input() endDate: string;
  @Input() filterBanned: boolean;
  @Input() filterUnbanned: boolean;
  constructor(
    private alumniService: AlumniService,
  ) { }

  ngOnInit() {
    this.reworkDate();
  }

  /**
   * {@link AlumniService#ban}
   */
  ban() {
    this.alumniService.ban(this.alumni, this.endDate);
    this.alumni.ban = true;
  }

  /**
   * {@link AlumniService#unban}
   */
  unban() {
    this.alumniService.unban(this.alumni);
    this.alumni.ban = false;
  }

  private reworkDate() {
    var date = new Date(this.endDate);
    this.endDate = date.toISOString();
  }

}
