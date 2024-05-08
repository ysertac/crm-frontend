import { AddressApiService } from './../../services/address-api.service';
import { ContactMediumApiService } from './../../services/contact-medium-api.service';
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
import { CustomerApiService } from '../../services/customer-api.service';
import { Store, select } from '@ngrx/store';
import { selectContactMedium } from '../../../../shared/store/contactMedium/contact-medium.selector';
import { setContactMedium } from '../../../../shared/store/contactMedium/contact-medium.action';
import { selectIndividualCustomer } from '../../../../shared/store/customers/individual-customer.selector';
import { selectCustomerAddress } from '../../../../shared/store/addresses/customer-address.selector';
import { PostAddressRequest } from '../../models/address/post-address-request';
import { PostContactMediumRequest } from '../../models/contact-medium/post-contact-medium-request';
import { PostCustomerRequest } from '../../models/customer/post-customer-request';
import { PostCustomerResponse } from '../../models/customer/post-customer-response';
import { setCustomerAddress } from '../../../../shared/store/addresses/customer-address.action';

@Component({
  selector: 'app-contact-medium-create',
  standalone: true,
  imports: [InputComponent, ButtonComponent, RouterLink, ReactiveFormsModule],
  templateUrl: './contact-medium-create.component.html',
  styleUrl: './contact-medium-create.component.scss',
})
export class ContactMediumCreateComponent {
  form!: FormGroup;
  createdCustomerResponse: PostCustomerResponse;
  address: PostAddressRequest;

  constructor(
    private fb: FormBuilder,
    private customerApiService: CustomerApiService,
    private contactMediumApiService: ContactMediumApiService,
    private addressApiService: AddressApiService,
    private router: Router,
    private store: Store<{ individualCustomer: PostCustomerRequest }>
  ) {}

  ngOnInit(): void {
    this.createForm();

    this.store.pipe(select(selectContactMedium)).subscribe((contactMedium) => {
      this.form.patchValue(contactMedium);
    });
  }

  createForm() {
    this.form = this.fb.group({
      email: ['', Validators.required],
      homePhone: ['', Validators.required],
      mobilePhone: ['', Validators.required],
      fax: ['', Validators.required],
    });
  }

  createContactMedium() {
    let contactMedium: PostContactMediumRequest = {
      email: this.form.value.email,
      homePhone: this.form.value.homePhone,
      mobilePhone: this.form.value.mobilePhone,
      fax: this.form.value.fax,
      customerId: this.createdCustomerResponse.customerId,
    };
    this.contactMediumApiService
      .add(contactMedium)
      .subscribe({
        next: (response) => {
        },
      })
      .unsubscribe();
  }

  goPrevious() {
    const contactMedium: PostContactMediumRequest = {
      email: this.form.value.email,
      homePhone: this.form.value.homePhone,
      mobilePhone: this.form.value.mobilePhone,
      fax: this.form.value.fax,
      customerId: null,
    };
    this.store.dispatch(setContactMedium({ contactMedium }));
    this.router.navigate(['/home/create-address']);
  }

  onFormSubmit() {
    if (this.form.invalid) {
      console.error('Form is invalid');
      return;
    }
    this.createCustomer();
  }

  createCustomer() {
    let customer: PostCustomerRequest;
    this.store
      .pipe(select(selectIndividualCustomer))
      .subscribe((individualCustomer) => {
        customer = individualCustomer;
      });
    this.customerApiService.add(customer).subscribe({
      next: (response) => {
        this.createdCustomerResponse = response;
        this.createAddress();
      },
    });
  }

  createAddress() {
    this.store
      .pipe(select(selectCustomerAddress))
      .subscribe((customerAddress) => {
        //this.store.dispatch(setCustomerAddress({customerAddress.customerId:this.createdCustomerResponse.customerId}));
        this.address = customerAddress;
      });
    let newAddress: PostAddressRequest = {
      customerId: this.createdCustomerResponse.customerId,
      cityId: this.address.cityId, 
      neighbourhood: this.address.neighbourhood,
      houseNumber: this.address.houseNumber,
      district: this.address.district,
      street: this.address.street,
      description: this.address.description,
    }
    console.log(newAddress);
    this.addressApiService.add(newAddress).subscribe({
      next: (response) => {
        this.createContactMedium();
      },
    });
  }
}
