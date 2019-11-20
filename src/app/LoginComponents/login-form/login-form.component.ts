import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";

import { AuthenticationService } from './../../_services';

import { User } from './../../_models';

import { environment } from './../../../environments/environment';

import { VERSION } from './../../../environments/version';

/**
 * Author : Lucas Pauzies
 *
 * Component to display modal for forgotten password
 *
 */
@Component({
  selector: 'info-modal-login-form',
  template: `
      <div class="modal-header">
        <h3 class="modal-title">Mot de passe oublié ?</h3>
        <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body bg-light">
        <ul class="list-group">
          <li class="list-group-item">
            <h5>Si vous êtes professeur ou administratif :</h5>
              <span class="font-weight-light">Rendez vous au service informatique de votre campus.</span>
          </li>
          <li class="list-group-item">
            <h5>Si vous êtes intervenant :</h5>
              <span class="font-weight-light">Contactez le responsable de votre département.</span>
          </li>
        </ul>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Fermer</button>
      </div>
  `
})
export class InfoModalLoginForm {
  constructor(public activeModal: NgbActiveModal) {}
}

/**
 * Author : Lucas Pauzies
 *
 * Component to manage the login form, the validation and the display
 *
 */
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit, OnDestroy {

  subscriber: any;
  hasExpired: boolean;
  hasError: boolean;
  version = VERSION;

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService) {}

  loginForm = this.formBuilder.group({
    usernameInput: ['', Validators.required],
    passwordInput: ['', Validators.required]
  });

  ngOnInit() {
    this.hasError = false;
    this.subscriber = this.route.queryParams.subscribe(params => {
      this.hasExpired = params['hasExpired'] || false;
    });
    history.pushState(null, null, environment.domain + '/login');
  }

  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }

  /**
   * Author : Lucas Pauzies
   *
   * Open the modal InfoModalLoginForm
   */
  open() {
    history.pushState(null, null, environment.domain + '/login');
    this.modalService.open(InfoModalLoginForm, { size: 'lg'});
  }

  /**
   * Author : Lucas Pauzies
   *
   * Submit the form and login the user, if logged go to page case of user status, else redirect to '/login'
   */
  onSubmit() {
    var promiseLogin = this.authenticationService.login(this.loginForm.value.usernameInput,this.loginForm.value.passwordInput);
    promiseLogin.then(data => {
      var user = new User(data.data.login, data.data.admin_right, data.data.token, data.data.nb_ban);
      this.authenticationService.setLocalStorageCurrentUser(user);
      if (user.status == 'root') {
        this.router.navigate(['/root']);
      } else {
        this.router.navigate(['/home']);
      }
    }).catch(error => {
      this.hasError = true;
    });
  }

}
