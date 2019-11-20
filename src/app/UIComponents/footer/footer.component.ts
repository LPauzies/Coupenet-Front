import { Component, OnInit } from '@angular/core';

import { VERSION } from './../../../environments/version';

/**
 * Author : Lucas Pauzies
 *
 * UI Component as footer for the app
 */
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  version = VERSION;
}
