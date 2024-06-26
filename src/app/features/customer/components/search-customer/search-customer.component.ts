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
import { environment } from '../../../../../environments/environment';

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
  fName: string = '';
  lName: string = '';
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
        this.searchCustomerApiService.apiUrl =
          environment.apiUrl + '/searchservice/api/v1/searchcustomer?';
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
    if(this.form.get("nationalityId").dirty){
      console.log("nationality")
      this.nId = this.form.value.nationalityId.replace(/\D/g, '');
      this.form.patchValue({
      nationalityId: this.nId,
    });
      this.form.get("nationalityId").markAsPristine();
    }
  }

  checkCustomerId() {
    if(this.form.get("id").dirty){
      console.log("customerid")
      this.cId = this.form.value.id.replace(/\D/g, '');
      this.form.patchValue({
        id: this.cId,
      });
      this.form.get("id").markAsPristine();
    }
  }

  checkAccountNumber() {
    if(this.form.get("accountNumber").dirty){
      console.log("accountnumber")
      this.accountNumber = this.form.value.accountNumber.replace(/\D/g, '');
      this.form.patchValue({
        accountNumber: this.accountNumber,
      });
      this.form.get("accountNumber").markAsPristine();
    }
  }

  checkMobilePhone() {
    if(this.form.get("mobilePhone").dirty){
      console.log("mobilephone")
      this.mobilePhone = this.form.value.mobilePhone.replace(/\D/g, '');
      this.form.patchValue({
        mobilePhone: this.mobilePhone,
      });
      this.form.get("mobilePhone").markAsPristine();
    }
  }

  checkOrderNumber() {
    if(this.form.get("orderNumber").dirty){
      console.log("ordernumber")
      this.orderNumber = this.form.value.orderNumber.replace(/\D/g, '');
      this.form.patchValue({
        orderNumber: this.orderNumber,
      });
      this.form.get("orderNumber").markAsPristine();
    }
  }

  checkFirstName() {
    if(this.form.get("firstName").dirty){
      console.log("firstName")
      this.fName = this.form.value.firstName.replace(
        /[^a-zA-ZğüşöçİĞÜŞÖÇ\s]*/g,
        ''
      );
      this.form.patchValue({
        firstName: this.fName,
      });
      this.form.get("firstName").markAsPristine();
    }
  }

  checkLastName() {
    if(this.form.get("lastName").dirty){
      console.log("lastname")
      this.lName = this.form.value.lastName.replace(
        /[^a-zA-ZğüşöçİĞÜŞÖÇ\s]*/g,
        ''
      );
      this.form.patchValue({
        lastName: this.lName,
      });
      this.form.get("lastName").markAsPristine();
    }
  }
}
