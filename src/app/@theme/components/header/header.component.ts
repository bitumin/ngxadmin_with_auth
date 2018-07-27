import { Component, Input, OnInit } from '@angular/core';
import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { AuthService } from '../../../auth.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';

  user: any;
  userMenu = [{
    title: 'Log out',
  }];
  environment = environment;

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private authService: AuthService,
              /*private analyticsService: AnalyticsService*/) {
  }

  ngOnInit() {
    this.authService.user.subscribe((user: any) => {
      if (!!user) {
        this.user = {
          name: user.email,
          picture: 'assets/images/default_user_icon.png',
        };
      }

      return user;
    });
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  // toggleSettings(): boolean {
  //   this.sidebarService.toggle(false, 'settings-sidebar');
  //   return false;
  // }

  goToHome() {
    this.menuService.navigateHome();
  }

  // startSearch() {
  //   this.analyticsService.trackEvent('startSearch');
  // }
}
