import { CustomerApiService } from './../../services/customer-api.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { GetCustomerResponse } from '../../models/customer/get-customer-response';
import { setIndividualCustomer } from '../../../../shared/store/customers/individual-customer.action';
import { Store } from '@ngrx/store';
import { PostCustomerRequest } from '../../models/customer/post-customer-request';

@Component({
  selector: 'app-customer-info',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './customer-info.component.html',
  styleUrl: './customer-info.component.scss',
})
export class CustomerInfoComponent implements OnInit {
  customerId: string;
  customerDemographicInfo: GetCustomerResponse;

  constructor(
    private route: ActivatedRoute,
    private customerApiService: CustomerApiService,
    private store: Store<{ individualCustomer: PostCustomerRequest }>
  ) {}

  ngOnInit(): void {
    // this.customerId = this.route.snapshot.paramMap.get('id');
    this.getById();
  }

  getById() {
    this.customerApiService
      .getById('b995ee6e-ec10-46cd-b134-33b9b188faf8')
      .subscribe({
        next: (response) => {
          this.customerDemographicInfo = response;
          this.createCustomer(response);
        },
        error: (error) => {
          console.error('Error:', error);
        },
      });
  }

  createCustomer(response: GetCustomerResponse) {
    const individualCustomer: PostCustomerRequest = {
      firstName: response.firstName,
      middleName: response.middleName,
      lastName: response.lastName,
      gender: response.gender,
      motherName: response.motherName,
      fatherName: response.fatherName,
      birthDate: response.birthDate,
      nationalityId: response.nationalityId,
    };
    this.store.dispatch(setIndividualCustomer({ individualCustomer }));
    console.log(individualCustomer);

  }
}
