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
  selectedOption: string;
  options: string[] = ['Male', 'Female'];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store<{ individualCustomer: PostCustomerRequest }>
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

  createForm() {
    this.form = this.fb.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      middleName: ['', Validators.maxLength(30)],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      gender: ['', Validators.required],
      motherName: ['', [Validators.minLength(3), Validators.maxLength(30)]],
      fatherName: ['', [Validators.minLength(3), Validators.maxLength(30)]],
      birthDate: ['', Validators.required],
      nationalityId: ['', [Validators.required]],
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
    this.store.dispatch(setIndividualCustomer({ individualCustomer }));
    this.router.navigate(['/home/create-address']);
  }

  onFormSubmit() {
    if (this.form.invalid) {
      console.error('Form is invalid');
      console.error(this.form.get('firstName').hasError('required'));
      console.error(this.form.get('firstName').hasError('minlength'));
      console.error(this.form.get('nationalityId').hasError('pattern'));
      return;
    }
    this.createCustomer();
  }

  //inputlarda hata giderildiğinde hata mesajının bulunduğu boşluğun olmaması gerekiyor.
  //birthdate inputunun DD/MM/YYYY formatında olması gerekiyor.
}
