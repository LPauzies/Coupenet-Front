import { Component, OnInit, Input } from '@angular/core';

/**
 * Author : Lucas Pauzies
 *
 * Component to display login feature
 *
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Input() hasError: boolean;

  constructor() { }

  ngOnInit() {
  }

}
