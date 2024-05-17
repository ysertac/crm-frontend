import { Component, OnInit } from '@angular/core';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { setIndividualCustomer } from '../../../../shared/store/customers/individual-customer.action';
import { selectIndividualCustomer } from '../../../../shared/store/customers/individual-customer.selector';
import { PostCustomerRequest } from '../../models/customer/post-customer-request';
import { CommonModule } from '@angular/common';
import { ErrorMessagesPipe } from '../../../../core/pipe/error-messages.pipe';
import { OnlyNumbersPipe } from '../../../../core/pipe/only-numbers.pipe';
import { selectCustomerAddress } from '../../../../shared/store/addresses/customer-address.selector';
import { setCustomerAddress } from '../../../../shared/store/addresses/customer-address.action';
import { PostAddressRequest } from '../../models/address/post-address-request';
import { PostContactMediumRequest } from '../../models/contact-medium/post-contact-medium-request';
import { setContactMedium } from '../../../../shared/store/contactMedium/contact-medium.action';
import { CustomerApiService } from '../../services/customer-api.service';
import { CheckMernisRequest } from '../../models/customer/check-mernis-request';

@Component({
  selector: 'app-create-customer-form',
  standalone: true,
  imports: [
    InputComponent,
    ButtonComponent,
    RouterLink,
    ReactiveFormsModule,
    ErrorMessagesPipe,
    CommonModule,
    FormsModule,
    OnlyNumbersPipe,
  ],
  templateUrl: './create-customer-form.component.html',
  styleUrl: './create-customer-form.component.scss',
})
export class CreateCustomerFormComponent implements OnInit {
  form!: FormGroup;
  nId: string = '';
  isNotTurkishCitizen = false;
  nIdMaxLength: number | null = 11;
  hasNationalityIdError: boolean = false;
  selectedOption: string;
  options: string[] = ['Male', 'Female'];
  nationalityIdError: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store<{ individualCustomer: PostCustomerRequest }>,
    private customerApiService: CustomerApiService
  ) {}

  ngOnInit(): void {
    this.createForm();

    this.store
      .pipe(select(selectIndividualCustomer))
      .subscribe((individualCustomer) => {
        this.form.patchValue(individualCustomer);
        this.selectedOption = individualCustomer.gender;
        console.log(individualCustomer);
      });
  }

  toggleTurkishCitizen() {
    this.isNotTurkishCitizen = this.isNotTurkishCitizen == true ? false : true;
    this.form.patchValue({
      nationalityId: '',
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

  createForm() {
    this.form = this.fb.group({
      firstName: ['', [Validators.required]],
      middleName: [''],
      lastName: ['', [Validators.required]],
      gender: ['', Validators.required],
      motherName: [''],
      fatherName: [''],
      birthDate: ['', Validators.required],
      nationalityId: [this.nId, [Validators.required]],
    });
  }

  createCustomer() {
    const individualCustomer: PostCustomerRequest = {
      firstName: this.form.value.firstName,
      middleName: this.form.value.middleName,
      lastName: this.form.value.lastName,
      gender: this.form.value.gender,
      motherName: this.form.value.motherName,
      fatherName: this.form.value.fatherName,
      birthDate: this.form.value.birthDate,
      nationalityId: this.form.value.nationalityId,
    };
    let fullName = '';
    if (individualCustomer.middleName !== '') {
      fullName =
        individualCustomer.firstName + ' ' + individualCustomer.middleName;
    } else {
      fullName = individualCustomer.firstName;
    }
    const checkMernis: CheckMernisRequest = {
      firstName: fullName,
      lastName: individualCustomer.lastName,
      birthDate: individualCustomer.birthDate,
      nationalityId: individualCustomer.nationalityId,
    };
    console.log(checkMernis);
    this.customerApiService.checkMernis(checkMernis).subscribe({
      next: (response) => {
        if (response) {
          console.log(response);

          this.store.dispatch(setIndividualCustomer({ individualCustomer }));
          this.router.navigate(['/home/create-address']);
        } else {
          this.hasNationalityIdError = true;
          this.nationalityIdError =
            'Identity information could not be verified!';
        }
      },
    });
  }

  onFormSubmit() {
    if (this.form.invalid) {
      console.error('Form is invalid');
      console.error(this.form.get('firstName').hasError('required'));
      console.error(this.form.get('firstName').hasError('minlength'));
      console.error(this.form.get('nationalityId').hasError('pattern'));
      return;
    }
    this.customerApiService
      .isIndividualCustomerExistsByNationalityId(this.form.value.nationalityId)
      .subscribe({
        next: (response) => {
          if (response) {
            this.hasNationalityIdError = true;
            this.nationalityIdError =
              'A customer is already exist with this Nationality ID!';
          } else {
            this.createCustomer();
          }
        },
      });
  }

  cancelCreation() {
    const individualCustomer: PostCustomerRequest = {
      firstName: '',
      middleName: '',
      lastName: '',
      gender: '',
      motherName: '',
      fatherName: '',
      birthDate: null,
      nationalityId: '',
    };
    this.store.dispatch(setIndividualCustomer({ individualCustomer }));

    const customerAddress: PostAddressRequest = {
      countryId: '',
      customerId: '',
      cityId: '',
      neighbourhood: '',
      houseNumber: '',
      districtId: '',
      street: '',
      description: '',
    };

    this.store.dispatch(setCustomerAddress({ customerAddress }));

    const contactMedium: PostContactMediumRequest = {
      customerId: '',
      email: '',
      homePhone: '',
      mobilePhone: '',
      fax: '',
    };
    this.store.dispatch(setContactMedium({ contactMedium }));
    this.router.navigate(['/home/search-customer']);
  }
  //inputlarda hata giderildiğinde hata mesajının bulunduğu boşluğun olmaması gerekiyor.
  //birthdate inputunun DD/MM/YYYY formatında olması gerekiyor.
}
