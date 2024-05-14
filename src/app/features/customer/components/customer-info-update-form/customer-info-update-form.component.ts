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
import { select, Store } from '@ngrx/store';
import { PostCustomerRequest } from '../../models/customer/post-customer-request';
import { selectIndividualCustomer } from '../../../../shared/store/customers/individual-customer.selector';
import { CustomerApiService } from '../../services/customer-api.service';
import { UpdateCustomerRequest } from '../../models/customer/update-customer-request';
import { ErrorMessagesPipe } from '../../../../core/pipe/error-messages.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-info-update-form',
  standalone: true,
  imports: [
    InputComponent,
    ButtonComponent,
    ReactiveFormsModule,
    ErrorMessagesPipe,
    CommonModule,
  ],
  templateUrl: './customer-info-update-form.component.html',
  styleUrl: './customer-info-update-form.component.scss',
})
export class CustomerInfoUpdateFormComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<{ individualCustomer: PostCustomerRequest }>,
    private customerApiService: CustomerApiService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.store
      .pipe(select(selectIndividualCustomer))
      .subscribe((individualCustomer) => {
        this.form.patchValue(individualCustomer);
      });
  }

  createForm() {
    this.form = this.fb.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      middleName: ['', Validators.maxLength(30)],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      gender: ['', Validators.required],
      motherName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      fatherName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      birthDate: ['', Validators.required],
      nationalityId: [
        '',
        [
          Validators.required,
          Validators.pattern('^[1-9]{1}[0-9]{9}[02468]{1}$'),
        ],
      ],
    });
  }

  onFormSubmit() {
    let updateCustomerRequest: UpdateCustomerRequest = {
      firstName: this.form.value.firstName,
      middleName: this.form.value.middleName,
      lastName: this.form.value.lastName,
      gender: this.form.value.gender,
      motherName: this.form.value.motherName,
      fatherName: this.form.value.fatherName,
      birthDate: this.form.value.birthDate,
      nationalityId: this.form.value.nationalityId,
    };
    this.customerApiService
      .update('95f25ca7-2cb7-4d39-870e-46d7a0e487fa', updateCustomerRequest)
      .subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.error(error);
        },
      });
  }
}
