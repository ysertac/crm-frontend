import { Component } from '@angular/core';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CustomerApiService } from '../../services/customer-api.service';
import { Store, select } from '@ngrx/store';
import { CreateCustomerRequest } from '../../models/requests/create-customer-request';
import { CreateContactMediumRequest } from '../../models/requests/create-contact-medium-request';
import { selectContactMedium } from '../../../../shared/store/contactMedium/contact-medium.selector';
import { setContactMedium } from '../../../../shared/store/contactMedium/contact-medium.action';

@Component({
  selector: 'app-contact-medium-create',
  standalone: true,
  imports: [InputComponent, ButtonComponent, RouterLink, ReactiveFormsModule],
  templateUrl: './contact-medium-create.component.html',
  styleUrl: './contact-medium-create.component.scss',
})
export class ContactMediumCreateComponent {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private customerApiService: CustomerApiService,
    private router: Router,
    private store: Store<{ individualCustomer: CreateCustomerRequest }>
  ) {}

  ngOnInit(): void {
    this.createForm();

    this.store.pipe(select(selectContactMedium)).subscribe((contactMedium) => {
      this.form.patchValue(contactMedium);
      console.log('contactMediumState:', contactMedium);
    });
  }

  createForm() {
    this.form = this.fb.group({
      email: ['', Validators.required],
      homePhone: ['', Validators.required],
      mobilePhone: ['', Validators.required],
      fax: ['', Validators.required],
    });
  }

  createContactMedium() {
    const contactMedium: CreateContactMediumRequest = {
      email: this.form.value.email,
      homePhone: this.form.value.homePhone,
      mobilePhone: this.form.value.mobilePhone,
      fax: this.form.value.fax,
    };
    this.store.dispatch(setContactMedium({ contactMedium }));
  }

  goPrevious() {
    const contactMedium: CreateContactMediumRequest = {
      email: this.form.value.email,
      homePhone: this.form.value.homePhone,
      mobilePhone: this.form.value.mobilePhone,
      fax: this.form.value.fax,
    };
    console.log(this.form.value);

    this.store.dispatch(setContactMedium({ contactMedium }));
    this.router.navigate(['/home/create-address']);
  }

  onFormSubmit() {
    console.log(this.form);

    if (this.form.invalid) {
      console.error('Form is invalid');
      return;
    }
    this.createContactMedium();
  }
}
