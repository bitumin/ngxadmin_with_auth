import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
      {{environment.appName}} Dashboard by <b><a href="https://www.tresipunt.com/" target="_blank">3iPunt</a></b> 2018
    </span>
    <div class="socials">
      <a *ngIf="environment.myGithub" [href]="environment.myGithub" target="_blank" class="ion ion-social-github"></a>
      <a *ngIf="environment.myFacebook" [href]="environment.myFacebook" target="_blank" class="ion ion-social-facebook"></a>
      <a *ngIf="environment.myTwitter" [href]="environment.myTwitter" target="_blank" class="ion ion-social-twitter"></a>
      <a *ngIf="environment.myLinkedin" [href]="environment.myLinkedin" target="_blank" class="ion ion-social-linkedin"></a>
    </div>
  `,
})
export class FooterComponent {
  environment = environment;
}
