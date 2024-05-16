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
import { Observable, forkJoin, switchMap } from 'rxjs';
import { ErrorMessagesPipe } from '../../../../core/pipe/error-messages.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-medium-create',
  standalone: true,
  imports: [
    InputComponent,
    ButtonComponent,
    RouterLink,
    ReactiveFormsModule,
    ErrorMessagesPipe,
    CommonModule,
  ],
  templateUrl: './contact-medium-create.component.html',
  styleUrl: './contact-medium-create.component.scss',
})
export class ContactMediumCreateComponent {
  form!: FormGroup;
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

  makeRequests() {
    let customerFromState: any;
    let addressesFromState: any[];
    let customerIdFromFirstReq: string;
    this.store
      .pipe(select(selectIndividualCustomer))
      .subscribe((individualCustomer) => {
        customerFromState = individualCustomer;
      });
    this.store
      .pipe(select(selectCustomerAddress))
      .subscribe((customerAddress) => {
        addressesFromState = customerAddress.customerAddresses;
        console.log(addressesFromState);
      });
    this.customerApiService
      .add(customerFromState)
      .pipe(
        switchMap((response1) => {
          console.log('deneme');
          customerIdFromFirstReq = response1.customerId;
          let newAddresses = addressesFromState.map((address) => {
            return { ...address, customerId: response1.customerId };
          });
          let addressRequests: Observable<any>[] = [];
          newAddresses.forEach((address) => {
            addressRequests.push(this.addressApiService.add(address));
          });
          /*let newAddress: PostAddressRequest = {
            customerId: response1.customerId,
            cityId: addressFromState.cityId,
            neighbourhood: addressFromState.neighbourhood,
            houseNumber: addressFromState.houseNumber,
            district: addressFromState.district,
            street: addressFromState.street,
            description: addressFromState.description,
          };*/
          return forkJoin(addressRequests).pipe(
            switchMap((response2) => {
              let contactMedium: PostContactMediumRequest = {
                email: this.form.value.email,
                homePhone: this.form.value.homePhone,
                mobilePhone: this.form.value.mobilePhone,
                fax: this.form.value.fax,
                customerId: customerIdFromFirstReq,
              };
              return this.contactMediumApiService.add(contactMedium);
            })
          );
        })
      )
      .subscribe();
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
        ],
      ],
      homePhone: ['', [Validators.minLength(10), Validators.maxLength(10)]],
      mobilePhone: ['', [Validators.required, Validators.pattern(/^5\d{9}$/)]],
      fax: ['', [Validators.minLength(10), Validators.maxLength(10)]],
    });
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
    this.makeRequests();
  }
}
