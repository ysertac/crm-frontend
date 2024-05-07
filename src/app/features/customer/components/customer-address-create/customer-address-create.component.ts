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
import { CreateAddressRequest } from '../../models/requests/create-address-request';
import { setCustomerAddress } from '../../../../shared/store/addresses/customer-address.action';
import { selectCustomerAddress } from '../../../../shared/store/addresses/customer-address.selector';

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
    private store: Store<{ customerAddress: CreateAddressRequest }>
  ) {}

  ngOnInit(): void {
    this.createForm();

    this.store
      .pipe(select(selectCustomerAddress))
      .subscribe((customerAddress) => {
        this.form.patchValue(customerAddress);
        console.log('customerAddressState:', customerAddress);
      });
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

  createAddress() {
    const customerAddress: CreateAddressRequest = {
      city: this.form.value.city,
      neighbourhood: this.form.value.neighbourhood,
      houseNumber: this.form.value.houseNumber,
      district: this.form.value.district,
      street: this.form.value.street,
      addressDesc: this.form.value.addressDesc,
    };
    this.store.dispatch(setCustomerAddress({ customerAddress }));
    this.router.navigate(['/home/create-address']);
  }

  onFormSubmit() {
    console.log(this.form);

    if (this.form.invalid) {
      console.error('Form is invalid');
      return;
    }
    this.createAddress();
  }
}
