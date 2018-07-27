import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { LinkRenderComponent } from './components/link-render.component';
import { AddressRenderComponent } from './components/address-render.component';
import { ModalComponent } from './components/modal.component';

const PAGES_COMPONENTS = [
  PagesComponent,
  LinkRenderComponent,
  AddressRenderComponent,
  ModalComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    MiscellaneousModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
  entryComponents: [
    LinkRenderComponent,
    AddressRenderComponent,
    ModalComponent,
  ],
})
export class PagesModule {
}
