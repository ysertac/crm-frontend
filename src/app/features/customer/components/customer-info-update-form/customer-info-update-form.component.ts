import { Component, OnInit } from '@angular/core';
import { InputComponent } from '../../../../shared/components/input/input.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-info-update-form',
  standalone: true,
  imports: [InputComponent, ButtonComponent, ReactiveFormsModule],
  templateUrl: './customer-info-update-form.component.html',
  styleUrl: './customer-info-update-form.component.scss',
})
export class CustomerInfoUpdateFormComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      motherName: ['', Validators.required],
      fatherName: ['', Validators.required],
      birthDate: ['', Validators.required],
      nationalityId: ['', Validators.required],
    });
  }
}
