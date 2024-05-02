import { Routes } from '@angular/router';
import { LoginPageComponent } from './routes/login-page/login-page.component';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';
import { SearchCustomerComponent } from './features/customer/components/search-customer/search-customer.component';
import { CustomerLayoutComponent } from './shared/layouts/customer-layout/customer-layout.component';
import { CustomerInfoComponent } from './features/customer/components/customer-info/customer-info.component';
import { CustomerAccountComponent } from './features/customer/components/customer-account/customer-account.component';
import { CustomerAddressComponent } from './features/customer/components/customer-address/customer-address.component';
import { ContactMediumComponent } from './features/customer/components/contact-medium/contact-medium.component';
import { CustomerInfoUpdateFormComponent } from './features/customer/components/customer-info-update-form/customer-info-update-form.component';
import { ContactMediumUpdateComponent } from './features/customer/components/contact-medium-update/contact-medium-update.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    pathMatch: 'prefix',
    component: MainLayoutComponent,
    children: [
      {
        path: 'search-customer',
        component: SearchCustomerComponent,
      },
      {
        path: 'customer/:id',
        component: CustomerLayoutComponent,
        children: [
          {
            path: 'info',
            component: CustomerInfoComponent,
          },
          {
            path: 'info/update',
            component: CustomerInfoUpdateFormComponent,
          },
          {
            path: 'account',
            component: CustomerAccountComponent,
          },
          {
            path: 'address',
            component: CustomerAddressComponent,
          },
          {
            path: 'contact-medium',
            component: ContactMediumComponent,
          },
          {
            path: 'contact-medium/update',
            component: ContactMediumUpdateComponent,
          },
        ],
      },
    ],
  },
];
