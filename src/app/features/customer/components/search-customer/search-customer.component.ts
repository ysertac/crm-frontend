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

  headers = [
    'Customer ID',
    'First Name',
    'Middle Name',
    'Last Name',
    'Role',
    'ID Number',
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
        console.log('Response:' + response[0]);
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

  customerCount: number = 1;
  customers: any[] = [
    {
      id: '987654321',
      customerId: '1',
      accountNumber: 'ACC987654',
      phoneNumber: '5551234567',
      firstName: 'John',
      middleName: 'abc',
      role: 'Customer',
      lastName: 'Doe',
      orderNumber: 'Product A',
    },
    {
      id: '123456789',
      customerId: 'C987654321',
      accountNumber: 'ACC123456',
      phoneNumber: '5559876543',
      firstName: 'Jane',
      middleName: '',
      role: 'Customer',
      lastName: 'Smith',
      orderNumber: 'Product B',
    },
    {
      id: '567890123',
      customerId: 'C543216789',
      accountNumber: 'ACC567890',
      phoneNumber: '5556789012',
      firstName: 'Michael',
      middleName: '',
      role: 'Customer',
      lastName: 'Johnson',
      orderNumber: 'Product C',
    },
    {
      id: '234567890',
      customerId: 'C678901234',
      accountNumber: 'ACC234567',
      phoneNumber: '5558901234',
      firstName: 'Emily',
      middleName: '',
      role: 'Customer',
      lastName: 'Brown',
      orderNumber: 'Product D',
    },
    {
      id: '890123456',
      customerId: 'C456789012',
      accountNumber: 'ACC890123',
      phoneNumber: '5553456789',
      firstName: 'David',
      middleName: '',
      role: 'Customer',
      lastName: 'Martinez',
      orderNumber: 'Product E',
    },
    {
      id: '456789012',
      customerId: 'C234567890',
      accountNumber: 'ACC456789',
      phoneNumber: '5552345678',
      firstName: 'Sarah',
      middleName: 'abc',
      role: 'Customer',
      lastName: 'Garcia',
      orderNumber: 'Product F',
    },
    {
      id: '012345678',
      customerId: 'C012345678',
      accountNumber: 'ACC012345',
      phoneNumber: '5550123456',
      firstName: 'Daniel',
      middleName: 'abc',
      role: 'Customer',
      lastName: 'Lopez',
      orderNumber: 'Product G',
    },
    {
      id: '345678901',
      customerId: 'C789012345',
      accountNumber: 'ACC345678',
      phoneNumber: '5554567890',
      firstName: 'Jessica',
      middleName: '',
      role: 'Customer',
      lastName: 'Hernandez',
      orderNumber: 'Product H',
    },
    {
      id: '678901234',
      customerId: 'C901234567',
      accountNumber: 'ACC678901',
      phoneNumber: '5557890123',
      firstName: 'Christopher',
      middleName: '',
      role: 'Customer',
      lastName: 'Perez',
      orderNumber: 'Product I',
    },
    {
      id: '901234567',
      customerId: 'C345678901',
      accountNumber: 'ACC901234',
      phoneNumber: '5559012345',
      firstName: 'Ashley',
      middleName: '',
      role: 'Customer',
      lastName: 'Gonzalez',
      orderNumber: 'Product J',
    },
  ];
}
