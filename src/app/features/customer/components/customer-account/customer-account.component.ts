import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { Router, RouterLink } from '@angular/router';
import { BillingAccountApiService } from '../../../billing/services/billing-account-api.service';
import { GetAllBillingAccountsResponse } from '../../../billing/models/billing-account/get-all-billing-accounts-response';
import { GetListResponse } from '../../../../shared/models/getListResponse';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-account',
  standalone: true,
  imports: [ButtonComponent, CommonModule, RouterLink],
  templateUrl: './customer-account.component.html',
  styleUrl: './customer-account.component.scss',
})
export class CustomerAccountComponent implements OnInit {
  accounts!: Array<GetAllBillingAccountsResponse>;
  isCollapsed = true;

  constructor(
    private router: Router,
    private billingAccountApi: BillingAccountApiService
  ) {}

  ngOnInit(): void {
    const customerId = this.router.url.split('/')[3];
    this.getBillingAccountByCustomerId(customerId);
  }

  getBillingAccountByCustomerId(customerId: string) {
    this.billingAccountApi.getByCustomerId(customerId).subscribe({
      next: (response) => {
        this.accounts = response;
      },
      error: (error) => {
        console.log(this.accounts);
        console.log(error);
      },
    });
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }
}
