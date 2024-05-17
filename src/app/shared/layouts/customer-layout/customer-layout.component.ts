import { CustomerApiService } from './../../../features/customer/services/customer-api.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterModule,
  RouterOutlet,
} from '@angular/router';

@Component({
  selector: 'app-customer-layout',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './customer-layout.component.html',
  styleUrl: './customer-layout.component.scss',
})
export class CustomerLayoutComponent implements OnInit {
  customerId: string;

  constructor(
    private router: Router,
    private customerApiService: CustomerApiService
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
}
