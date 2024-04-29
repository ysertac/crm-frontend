import { Component } from '@angular/core';
import { InputComponent } from '../../shared/components/input/input.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [InputComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {}
