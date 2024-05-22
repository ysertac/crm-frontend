import { Component, OnInit } from '@angular/core';
import { InputComponent } from '../../../../shared/components/input/input.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { PostCustomerRequest } from '../../models/customer/post-customer-request';
import { selectIndividualCustomer } from '../../../../shared/store/customers/individual-customer.selector';
import { CustomerApiService } from '../../services/customer-api.service';
import { UpdateCustomerRequest } from '../../models/customer/update-customer-request';
import { ErrorMessagesPipe } from '../../../../core/pipe/error-messages.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-info-update-form',
  standalone: true,
  imports: [
    InputComponent,
    ButtonComponent,
    ReactiveFormsModule,
    ErrorMessagesPipe,
    CommonModule,
  ],
  templateUrl: './customer-info-update-form.component.html',
  styleUrl: './customer-info-update-form.component.scss',
})
export class CustomerInfoUpdateFormComponent implements OnInit {
  form!: FormGroup;
  options: string[] = ['Male', 'Female'];
  customerId: string;
  nId: string = '';
  isNotTurkishCitizen = false;
  nIdMaxLength: number | null = 11;
  hasNationalityIdError: boolean = false;
  nationalityIdError:string=''

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store<{ individualCustomer: PostCustomerRequest }>,
    private customerApiService: CustomerApiService
  ) {}

  ngOnInit(): void {
    this.customerId = this.router.url.split('/')[3];
    this.createForm();
    this.store
      .pipe(select(selectIndividualCustomer))
      .subscribe((individualCustomer) => {
        this.form.patchValue(individualCustomer);
      });
  }

  createForm() {
    this.form = this.fb.group({
      firstName: ['',Validators.required],
      middleName: [''],
      lastName: ['',Validators.required,],
      gender: ['', Validators.required],
      motherName: [''],
      fatherName: [''],
      birthDate: ['', Validators.required],
      nationalityId: [
        '',
        [
          Validators.required,
          Validators.pattern('^[1-9]{1}[0-9]{9}[02468]{1}$'),
        ],
      ],
    });
  }

  checkNationalityId() {
    if (!this.isNotTurkishCitizen) {
      this.nId = this.form.value.nationalityId.replace(/\D/g, '');
      this.nIdMaxLength = 11;
      this.form.patchValue({
        nationalityId: this.nId,
      });
    } else {
      this.nIdMaxLength = null;
    }
  }

  toggleTurkishCitizen() {
    this.isNotTurkishCitizen = this.isNotTurkishCitizen == true ? false : true;
    this.form.patchValue({
      nationalityId: '',
    });
  }

  onFormSubmit() {
    let updateCustomerRequest: UpdateCustomerRequest = {
      firstName: this.form.value.firstName,
      middleName: this.form.value.middleName,
      lastName: this.form.value.lastName,
      gender: this.form.value.gender,
      motherName: this.form.value.motherName,
      fatherName: this.form.value.fatherName,
      birthDate: this.form.value.birthDate,
      nationalityId: this.form.value.nationalityId,
    };

    this.customerApiService
      .update(this.customerId, updateCustomerRequest)
      .subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          this.hasNationalityIdError = true;
          if(error.error.detail==='"This national ID number already exists!"') {
            this.nationalityIdError="A customer already exists with this Nationality ID"
          }else {
            this.nationalityIdError="Identity information could not be verified"
          }
        },
      });
  }
}
