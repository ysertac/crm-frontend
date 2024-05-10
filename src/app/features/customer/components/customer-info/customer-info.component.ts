import { CustomerApiService } from './../../services/customer-api.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { GetCustomerResponse } from '../../models/customer/get-customer-response';

@Component({
  selector: 'app-customer-info',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './customer-info.component.html',
  styleUrl: './customer-info.component.scss',
})
export class CustomerInfoComponent implements OnInit {
  customerId: string | null = null;
  customerDemographicInfo : GetCustomerResponse;

  constructor(
    private route: ActivatedRoute,
    private customerApiService: CustomerApiService
  ) {}

  ngOnInit(): void {
    this.customerId = this.route.snapshot.paramMap.get('id');
    this.getById(this.customerId);
  }

  getById(customerId: string) {
    return this.customerApiService.getById(customerId).subscribe({
      next: (response) => {
        this.customerDemographicInfo = response;
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }
}
