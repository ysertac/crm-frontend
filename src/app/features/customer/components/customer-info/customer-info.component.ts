import { CustomerApiService } from './../../services/customer-api.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
  customerDemographicInfo: GetCustomerResponse;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customerApiService: CustomerApiService,
    private store: Store<{ individualCustomer: PostCustomerRequest }>
  ) {}

  ngOnInit(): void {
    const customerId = this.router.url.split('/')[3];
    this.getById(customerId);
  }

  getById(customerId: string) {
    this.customerApiService.getById(customerId).subscribe({
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
