/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { NB_AUTH_OPTIONS } from '@nebular/auth';
import { getDeepFromObject } from '@nebular/auth/helpers';
import { NbAuthService } from '@nebular/auth';
import { NbAuthResult } from '@nebular/auth';
import { AuthService } from '../../../../auth.service';

@Component({
  selector: 'ngx-request-password-page',
  styleUrls: ['./request-password.component.scss'],
  template: `
    <ngx-auth-block>
      <h2 class="title">Recuperar contraseña</h2>
      <small class="form-text sub-title">Introduce tu dirección de e-mail y recibirás un correo para resetear tu contraseña.</small>
      <form (ngSubmit)="requestPass()" #requestPassForm="ngForm">

        <div *ngIf="showMessages.error && errors && errors.length > 0 && !submitted"
             class="alert alert-danger" role="alert">
          <div><strong>¡Ups!</strong></div>
          <div *ngFor="let error of errors">{{ error }}</div>
        </div>
        <div *ngIf="showMessages.success && messages && messages.length > 0 && !submitted"
             class="alert alert-success" role="alert">
          <div><strong>Todo correcto</strong></div>
          <div *ngFor="let message of messages">{{ message }}</div>
        </div>

        <div class="form-group">
          <label for="input-email" class="sr-only">Introduce tu dirección de e-mail</label>
          <input name="email" [(ngModel)]="user.email" id="input-email" #email="ngModel"
                 class="form-control" placeholder="E-mail" pattern=".+@.+\..+"
                 [class.form-control-danger]="email.invalid && email.touched"
                 [required]="getConfigValue('forms.validation.email.required')"
                 autofocus>
          <small class="form-text error" *ngIf="email.invalid && email.touched && email.hasError('required')">
            ¡E-mail requerido!
          </small>
          <small class="form-text error"
                 *ngIf="email.invalid && email.touched && email.hasError('pattern')">
            ¡E-mail inválido!
          </small>
        </div>

        <button [disabled]="submitted || !requestPassForm.form.valid" class="btn btn-hero-success btn-block"
                [class.btn-pulse]="submitted">
          Enviar
        </button>
      </form>

      <div class="links col-sm-12">
        <small class="form-text">
          ¿Ya tienes cuenta? <a routerLink="/auth/login"><strong>Acceder</strong></a>
        </small>
      </div>
    </ngx-auth-block>
  `,
})
export class NgxRequestPasswordComponent {

  redirectDelay: number = 0;
  showMessages: any = {};

  submitted = false;
  errors: string[] = [];
  messages: string[] = [];
  user: any = {};

  constructor(protected authService: AuthService,
              @Inject(NB_AUTH_OPTIONS) protected options = {},
              protected router: Router) {

    this.redirectDelay = this.getConfigValue('forms.requestPassword.redirectDelay');
    this.showMessages = this.getConfigValue('forms.requestPassword.showMessages');
  }

  requestPass(): void {
    this.errors = this.messages = [];
    this.submitted = true;

    this.authService.resetPassword(this.user.email).then(() => {
      this.submitted = false;

      this.messages = ['Correo de recuperación enviado...'];

      const redirect = '/auth/login';
      if (redirect) {
        setTimeout(() => {
          return this.router.navigateByUrl(redirect);
        }, this.redirectDelay);
      }
    });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }
}
