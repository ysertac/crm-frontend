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
import { ContactMediumCreateComponent } from './features/customer/components/contact-medium-create/contact-medium-create.component';
import { CustomerAddressCreateComponent } from './features/customer/components/customer-address-create/customer-address-create.component';
import { CreateCustomerFormComponent } from './features/customer/components/create-customer-form/create-customer-form.component';
import { ProductConfigurationFormComponent } from './features/product/components/product-configuration-form/product-configuration-form.component';
import { SalesLayoutComponent } from './shared/layouts/sales-layout/sales-layout.component';
import { CreateBillingAccountComponent } from './features/billing/components/create-billing-account/create-billing-account.component';
import { CustomerAddressUpdateComponent } from './features/customer/components/customer-address-update/customer-address-update.component';

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
        path: '',
        pathMatch: 'full',
        redirectTo: 'search-customer',
      },
      {
        path: 'search-customer',
        component: SearchCustomerComponent,
      },
      {
        path: 'create-customer',
        component: CreateCustomerFormComponent,
      },
      {
        path: 'contact-medium-create',
        component: ContactMediumCreateComponent,
      },
      {
        path: 'create-address',
        component: CustomerAddressCreateComponent,
      },
      {
        path: 'product-configuration',
        component: ProductConfigurationFormComponent,
      },
      {
        path: 'create-billing-account',
        component: CreateBillingAccountComponent,
      },
      {
        path: 'customer/:id',
        component: CustomerLayoutComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'info',
          },
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
            path: 'address/update',
            component: CustomerAddressUpdateComponent,
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
      {
        path: 'sales',
        component: SalesLayoutComponent,
      },
    ],
  },
];
