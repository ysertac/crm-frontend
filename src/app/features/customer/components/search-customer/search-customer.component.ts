import { Component } from '@angular/core';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

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
    ReactiveFormsModule
  ],
})
export class SearchCustomerComponent {
  form!: FormGroup;
  customerCount: number = 0;

  headers = [
    'Customer ID',
    'First Name',
    'Middle Name',
    'Last Name',
    'Role',
    'ID Number',
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // this.createForm();
  }

  // createForm() {
  //   this.form = this.fb.group({
  //     firstName: ['', Validators.required],
  //     middleName: ['', Validators.required],
  //     lastName: ['', Validators.required],
  //     gender: ['', Validators.required],
  //     motherName: ['', Validators.required],
  //     fatherName: ['', Validators.required],
  //     birthDate: ['', Validators.required],
  //     nationalityId: ['', Validators.required],
  //   });
  // }

  onFormSubmit() {}
}
