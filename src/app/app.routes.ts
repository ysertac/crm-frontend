import { Routes } from '@angular/router';
import { LoginPageComponent } from './routes/login-page/login-page.component';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';

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
  },
];
