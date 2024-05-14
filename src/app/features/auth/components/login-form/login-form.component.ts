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
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /\b[A-Za-z0-9._%+-]+@(?:[A-Za-z0-9-]+\.)+[A-Z|a-z]{2,}\b/
          ),
          Validators.maxLength(30),
        ],
      ],
      password: ['', [Validators.required, Validators.maxLength(30)]],
      rememberMe: [''],
    });
  }

  login() {
    const loginRequest: Login = {
      email: this.form.value.email,
      password: this.form.value.password,
      rememberMe: this.form.value.rememberMe,
    };
    if (loginRequest.email == '' || loginRequest.password == '') {
      this.showLoginError = true;
      this.loginErrorMessage = 'Please fill in the required fields!';
    } else {
      if (
        loginRequest.email === 'admin@admin.com' &&
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
    console.log(this.form);
  }
  /* @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.getModifierState && event.getModifierState('CapsLock')) {
      console.log('Caps Lock açık!');
      this.capslockIsActive = true;
    } else {
      console.log('Caps Lock kapalı.');
      this.capslockIsActive = false;
    }
  } */

  onKeyDown(event: KeyboardEvent) {
    if (event.getModifierState && event.getModifierState('CapsLock')) {
      console.log('Caps Lock açık!');
      this.capslockIsActive = true;
    } else {
      console.log('Caps Lock kapalı.');
      this.capslockIsActive = false;
    }
  }
}
