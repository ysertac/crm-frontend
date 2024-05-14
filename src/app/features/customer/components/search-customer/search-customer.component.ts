import { Component } from '@angular/core';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SearchCustomerApiService } from '../../services/search-customer-api.service';
import { PostSearchCustomerRequest } from '../../models/search/post-search-customer-request';
import { PostSearchCustomerResponse } from '../../models/search/post-search-customer-response';

@Component({
  selector: 'app-search-customer',
  standalone: true,
  templateUrl: './search-customer.component.html',
  styleUrl: './search-customer.component.scss',
  imports: [
    InputComponent,
    ButtonComponent,
    TableComponent,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
  ],
})
export class SearchCustomerComponent {
  form!: FormGroup;
  filteredCustomers: PostSearchCustomerResponse[] = [];
  customerCount: number = 1;
  headers = [
    'Customer ID',
    'First Name',
    'Middle Name',
    'Last Name',
    'Role',
    'Nationality ID',
  ];

  constructor(
    private fb: FormBuilder,
    private searchCustomerApiService: SearchCustomerApiService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  searchRequest() {
    const request: PostSearchCustomerRequest = {
      customerId: this.form.value.id,
      nationalityId: this.form.value.nationalityId,
      accountNumber: this.form.value.accountNumber,
      mobilePhone: this.form.value.mobilePhone,
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      orderNumber: this.form.value.orderNumber,
    };
    this.searchCustomerApiService.search(request).subscribe({
      next: (response) => {
        this.filteredCustomers = response;
      },
      error: (error) => {
        console.log('Error:' + error);
      },
      complete: () => {
        console.log('Completed');
        this.form.reset();
      },
    });
  }

  createForm() {
    this.form = this.fb.group({
      firstName: [''],
      id: [''],
      lastName: [''],
      orderNumber: [''],
      accountNumber: [''],
      mobilePhone: [''],
      nationalityId: [''],
    });
  }

  onFormSubmit() {
    this.searchRequest();
  }
}
