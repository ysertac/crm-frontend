import { Component } from '@angular/core';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { CustomerApiService } from '../../services/customer-api.service';
import { CreateCustomerRequest } from '../../models/requests/create-customer-request';
import { selectIndividualCustomer } from '../../../../shared/store/customers/individual-customer.selector';

@Component({
  selector: 'app-customer-address-create',
  standalone: true,
  imports: [InputComponent, ButtonComponent, RouterLink, ReactiveFormsModule],
  templateUrl: './customer-address-create.component.html',
  styleUrl: './customer-address-create.component.scss',
})
export class CustomerAddressCreateComponent {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private customerApiService: CustomerApiService,
    private router: Router,
    private store: Store<{ individualCustomer: CreateCustomerRequest }>
  ) {}

  ngOnInit(): void {
    this.createForm();

    /* this.store
      .pipe(select(selectIndividualCustomer))
      .subscribe((individualCustomer) => {
        this.form.patchValue(individualCustomer);
        console.log('individualCustomerState:', individualCustomer);
      }); */
  }

  createForm() {
    this.form = this.fb.group({
      city: ['', Validators.required],
      neighbourhood: ['', Validators.required],
      houseNumber: ['', Validators.required],
      district: ['', Validators.required],
      street: ['', Validators.required],
      addressDesc: ['', Validators.required],
    });
  }

  // Yeni dto oluşturulup değiştirilecek
  createCustomer() {
    const individualCustomer: CreateCustomerRequest = {
      firstName: this.form.value.firstName,
      middleName: this.form.value.middleName,
      lastName: this.form.value.lastName,
      gender: this.form.value.gender,
      motherName: this.form.value.motherName,
      fatherName: this.form.value.fatherName,
      birthDate: this.form.value.birthDate,
      nationalityId: this.form.value.nationalityId,
    };
    //this.store.dispatch(setIndividualCustomer({ individualCustomer }));
    this.router.navigate(['/home/create-address']);
  }
  // Yeni dto oluşturulup değiştirilecek

  onFormSubmit() {
    console.log(this.form);

    if (this.form.invalid) {
      console.error('Form is invalid');
      return;
    }
    this.createCustomer();
  }
}
