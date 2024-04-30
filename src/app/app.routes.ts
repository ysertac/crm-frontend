import { Routes } from '@angular/router';
import { LoginPageComponent } from './routes/login-page/login-page.component';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';
import { SearchCustomerPageComponent } from './routes/search-customer-page/search-customer-page.component';

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
    pathMatch:'prefix',
    component: MainLayoutComponent,

    children: [
      {
        path: 'search-customer',
        component: SearchCustomerPageComponent,
      }
    ]
  },
];
