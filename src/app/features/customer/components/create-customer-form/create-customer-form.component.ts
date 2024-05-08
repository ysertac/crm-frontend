import { Component, OnInit } from '@angular/core';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CustomerApiService } from '../../services/customer-api.service';
import { Store, select } from '@ngrx/store';
import { setIndividualCustomer } from '../../../../shared/store/customers/individual-customer.action';
import { selectIndividualCustomer } from '../../../../shared/store/customers/individual-customer.selector';
import { PostCustomerRequest } from '../../models/customer/post-customer-request';

@Component({
  selector: 'app-create-customer-form',
  standalone: true,
  imports: [InputComponent, ButtonComponent, RouterLink, ReactiveFormsModule],
  templateUrl: './create-customer-form.component.html',
  styleUrl: './create-customer-form.component.scss',
})
export class CreateCustomerFormComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private customerApiService: CustomerApiService,
    private router: Router,
    private store: Store<{ individualCustomer: PostCustomerRequest }>
  ) {}

  ngOnInit(): void {
    this.createForm();

    this.store
      .pipe(select(selectIndividualCustomer))
      .subscribe((individualCustomer) => {
        this.form.patchValue(individualCustomer);
        console.log('individualCustomerState:', individualCustomer);
      });
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

  createCustomer() {
    const individualCustomer: PostCustomerRequest = {
      firstName: this.form.value.firstName,
      middleName: this.form.value.middleName,
      lastName: this.form.value.lastName,
      gender: this.form.value.gender,
      motherName: this.form.value.motherName,
      fatherName: this.form.value.fatherName,
      birthDate: this.form.value.birthDate,
      nationalityId: this.form.value.nationalityId,
    };
    this.store.dispatch(setIndividualCustomer({ individualCustomer }));
    this.router.navigate(['/home/create-address']);
  }

  onFormSubmit() {
    console.log(this.form);

    if (this.form.invalid) {
      console.error('Form is invalid');
      return;
    }
    this.createCustomer();
  }
}
