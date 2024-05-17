import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SearchCustomerApiService } from '../../services/search-customer-api.service';
import { PostSearchCustomerRequest } from '../../models/search/post-search-customer-request';
import { GetListResponse } from '../../../../shared/models/getListResponse';
import { GetAllSearchCustomerResponse } from '../../models/search/get-all-search-customer-response';

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
  nId: string = '';
  cId: string = '';
  accountNumber: string = '';
  mobilePhone: string = '';
  orderNumber: string = '';
  isFirtstRender: boolean = false;
  filteredCustomers: GetListResponse<GetAllSearchCustomerResponse>;
  customerCount: number = 0;
  stopSubmit: boolean = true;
  maxValue: number = 30;
  page: number = 0;
  hasPrevious: boolean;
  hasNext: boolean;
  activePage: number = 1;
  totalPage: number;
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
    });
  }

  searchRequest() {
    const request: PostSearchCustomerRequest = {
      size: 5,
      page: this.page,
      customerNumber: this.form.value.id,
      nationalityId: this.form.value.nationalityId,
      accountNumber: this.form.value.accountNumber,
      mobilePhone: this.form.value.mobilePhone,
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      orderNumber: this.form.value.orderNumber,
    };
    this.searchCustomerApiService.search(request).subscribe({
      next: (response) => {
        this.isFirtstRender = true;
        this.filteredCustomers = response;
        this.hasPrevious = this.filteredCustomers.hasPrevious;
        this.hasNext = this.filteredCustomers.hasNext;
        console.log(response);
        this.activePage = request.page + 1;
        this.totalPage = response.totalPage;
        if (response.items.length < 1) {
          this.customerCount = 0;
        } else {
          this.customerCount = response.items.length;
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
      id: [this.cId],
      lastName: [''],
      orderNumber: [this.orderNumber],
      accountNumber: [this.accountNumber],
      mobilePhone: [this.mobilePhone],
      nationalityId: [this.nId],
    });
  }

  onFormSubmit() {
    this.searchRequest();
  }

  goToPreviousPage() {
    this.page -= 1;
    this.searchRequest();
  }

  goToNextPage() {
    this.page += 1;
    this.searchRequest();
  }

  goToPage(activePage: number) {
    this.page = activePage - 1;
    this.searchRequest();
  }

  isActivePage(activePage: number) {
    return activePage === this.activePage ? true : false;
  }

  checkNationalityId() {
    this.nId = this.form.value.nationalityId.replace(/\D/g, '');
    this.form.patchValue({
      nationalityId: this.nId,
    });
  }

  checkCustomerId() {
    this.cId = this.form.value.id.replace(/\D/g, '');
    this.form.patchValue({
      id: this.cId,
    });
  }

  checkAccountNumber() {
    this.accountNumber = this.form.value.accountNumber.replace(/\D/g, '');
    this.form.patchValue({
      accountNumber: this.accountNumber,
    });
  }

  checkMobilePhone() {
    this.mobilePhone = this.form.value.mobilePhone.replace(/\D/g, '');
    this.form.patchValue({
      mobilePhone: this.mobilePhone,
    });
  }

  checkOrderNumber() {
    this.orderNumber = this.form.value.orderNumber.replace(/\D/g, '');
    this.form.patchValue({
      orderNumber: this.orderNumber,
    });
  }
}
