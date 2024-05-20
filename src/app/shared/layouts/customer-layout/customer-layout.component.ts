import { CustomerApiService } from './../../../features/customer/services/customer-api.service';
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { PostCustomerRequest } from '../../../features/customer/models/customer/post-customer-request';
import { setIndividualCustomer } from '../../store/customers/individual-customer.action';
import { PostAddressRequest } from '../../../features/customer/models/address/post-address-request';
import { setCustomerAddress, setCustomerAddresses } from '../../store/addresses/customer-address.action';
import { PostContactMediumRequest } from '../../../features/customer/models/contact-medium/post-contact-medium-request';
import { setContactMedium } from '../../store/contactMedium/contact-medium.action';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-customer-layout',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './customer-layout.component.html',
  styleUrl: './customer-layout.component.scss',
})
export class CustomerLayoutComponent implements OnInit, OnDestroy {
  customerId: string;

  constructor(
    private router: Router,
    private customerApiService: CustomerApiService,
    private store1: Store<{ individualCustomer: PostCustomerRequest }>,
    private store2: Store<{ customerAddress: PostAddressRequest }>,
    private store3: Store<{ customerAddresses: PostAddressRequest[] }>,
    private store4: Store<{ contactMedium: PostContactMediumRequest }>,
  ) {}

  ngOnInit(): void {
    this.customerId = this.router.url.split('/')[3];
  }

  deleteCustomer() {
    this.customerApiService.delete(this.customerId).subscribe({
      next: (response) => {
        console.log('deleted' + response);
      },
    });
  }

  ngOnDestroy(): void {
    const individualCustomer: PostCustomerRequest = {
      firstName: '',
      middleName: '',
      lastName: '',
      gender: '',
      motherName: '',
      fatherName: '',
      birthDate: null,
      nationalityId: '',
    };
    this.store1.dispatch(setIndividualCustomer({ individualCustomer }));

    const customerAddress: PostAddressRequest = {
      countryId: '',
      customerId: '',
      cityId: '',
      neighbourhood: '',
      houseNumber: '',
      districtId: '',
      street: '',
      description: '',
    };

    this.store2.dispatch(setCustomerAddress({ customerAddress }));

    const customerAddresses: PostAddressRequest[] = [];
    this.store3.dispatch(setCustomerAddresses({customerAddresses}))

    const contactMedium: PostContactMediumRequest = {
      customerId: '',
      email: '',
      homePhone: '',
      mobilePhone: '',
      fax: '',
    };
    this.store4.dispatch(setContactMedium({ contactMedium }));
  }
}
