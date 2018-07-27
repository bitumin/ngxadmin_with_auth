/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { NbMenuService } from '@nebular/theme';
import { AuthService } from './auth.service';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(
    private analytics: AnalyticsService,
    private menuService: NbMenuService,
    private authService: AuthService,
  ) {
    this.menuService.onItemClick().subscribe((event) => {
      this.onUserMenuItemSelection(event.item.title);
    });
  }

  ngOnInit() {
    this.analytics.trackPageViews();
  }

  onUserMenuItemSelection(title) {
    console.info('Selected menu item with title', title);
    if (title === 'Log out') {
      console.info('Signing out...');
      this.authService.signOut().catch(err => {
        console.error(err)
      });
    }
  }

}
