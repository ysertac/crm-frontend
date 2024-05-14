import { Component, HostListener, OnInit } from '@angular/core';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Login } from '../../models/login/login-request';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ErrorMessagesPipe } from '../../../../core/pipe/error-messages.pipe';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    InputComponent,
    ButtonComponent,
    ReactiveFormsModule,
    CommonModule,
    ErrorMessagesPipe,
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent implements OnInit {
  form!: FormGroup;
  showLoginError: boolean = false;
  loginErrorMessage: string = '';
  title: string = 'Sign in with your organizational account.';
  passwordInputType: string = 'password';
  showPasswordIconUrl: string =
    '../../../../../assets/images/login-screen/showPasswordIcon.png';
  capslockIsActive: boolean = false;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      username: ['', [Validators.maxLength(30)]],
      password: ['', [Validators.maxLength(30)]],
      rememberMe: [''],
    });
  }

  login() {
    const loginRequest: Login = {
      username: this.form.value.username,
      password: this.form.value.password,
      rememberMe: this.form.value.rememberMe,
    };
    if (loginRequest.username == '' || loginRequest.password == '') {
      this.showLoginError = true;
      this.loginErrorMessage = 'Please fill in the required fields!';
    } else {
      if (
        loginRequest.username === 'admin' &&
        loginRequest.password === 'admin'
      ) {
        this.router.navigate(['/home/search-customer']);
      } else {
        this.showLoginError = true;
        this.loginErrorMessage =
          'Wrong username or password! Please try again.';
      }
    }
  }

  showPasswordToggle() {
    this.passwordInputType =
      this.passwordInputType === 'password' ? 'text' : 'password';
    this.showPasswordIconUrl =
      this.passwordInputType === 'password'
        ? '../../../../../assets/images/login-screen/showPasswordIcon.png'
        : '../../../../../assets/images/login-screen/hidePasswordIcon.png';
  }

  onFormSubmit() {
    this.login();
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.getModifierState && event.getModifierState('CapsLock')) {
      this.capslockIsActive = true;
    } else {
      this.capslockIsActive = false;
    }
  }
}
