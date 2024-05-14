import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
export class SearchCustomerComponent implements OnInit {
  form!: FormGroup;
  filteredCustomers: PostSearchCustomerResponse[] = [];
  customerCount: number = 1;
  stopSubmit: boolean = true;
  maxValue: number = 30;
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
    this.form.valueChanges.subscribe(() => {
      this.checkAvailablityForSearch();
      if (this.form.value.accountNumber > this.maxValue) {
        this.form.value.accountNumber.value = this.maxValue;
      }
    });
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
        if (response.length < 1) {
          this.customerCount = 0;
        }
      },
      error: (error) => {
        console.log('Error:' + error);
      },
      complete: () => {
        console.log('Completed');
        this.searchCustomerApiService.apiUrl =
          'http://localhost:8082/searchservice/api/v1/searchcustomer?';
      },
    });
  }

  clear() {
    this.form.reset();
    this.stopSubmit = true;
  }

  checkAvailablityForSearch() {
    for (let controlName in this.form.controls) {
      if (this.form.get(controlName).value != '') {
        this.stopSubmit = false;
        break;
      } else {
        this.stopSubmit = true;
      }
    }
    console.log(this.stopSubmit);
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
