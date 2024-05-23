import { Component, OnInit } from '@angular/core';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { BillingAccountApiService } from '../../services/billing-account-api.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PostBillingAccountRequest } from '../../models/billing-account/post-billing-account-request';
import { PostAddressBillingAccountRequest } from '../../models/billing-account/post-address-billing-account-request';

@Component({
  selector: 'app-create-billing-account',
  standalone: true,
  imports: [InputComponent, ButtonComponent, ReactiveFormsModule],
  templateUrl: './create-billing-account.component.html',
  styleUrl: './create-billing-account.component.scss',
})
export class CreateBillingAccountComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private billingAccountApi: BillingAccountApiService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      name: [''],
      description: [''],
      addressId: [''],
    });
  }

  createBillingAccount() {
    const billingAccount: PostBillingAccountRequest = {
      accountNumber: Math.random() * Math.pow(10, 6),
      customerId: 'abc',
      description: this.form.value.description,
      name: this.form.value.name,
    };
  }

  createAddressBillingAccount() {
    const addressBillingAccount: PostAddressBillingAccountRequest = {
      addressId: this.form.value.addressId,
      billingAccountId: 'abc',
    };
  }

  onFormSubmit() {}

  /* ngOnInit(): void {
    const customerId = this.router.url.split('/')[3];
    this.getBillingAccountByCustomerId(customerId);
  }

  getBillingAccountByCustomerId(customerId: string) {
    this.billingAccountApi.getByCustomerId(customerId).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      },
    });
  } */
}
