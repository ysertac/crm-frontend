import { Component, OnInit } from '@angular/core';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ContactMediumApiService } from '../../services/contact-medium-api.service';
import { UpdateContactMediumRequest } from '../../models/contact-medium/update-contact-medium-request';

@Component({
  selector: 'app-contact-medium-update',
  standalone: true,
  imports: [InputComponent, ButtonComponent, ReactiveFormsModule],
  templateUrl: './contact-medium-update.component.html',
  styleUrl: './contact-medium-update.component.scss',
})
export class ContactMediumUpdateComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private contactMediumApiService: ContactMediumApiService
  ) {}

  ngOnInit(): void {
    //...
  }

  form: FormGroup = this.fb.group({
    email: ['', Validators.required],
    homePhone: ['', Validators.required],
    mobilePhone: ['', Validators.required],
    fax: ['', Validators.required],
  });

  updateContactMedium() {
    //...
    const contactMedium: UpdateContactMediumRequest = {
      customerId: '',
      email: this.form.value.email,
      homePhone: this.form.value.homePhone,
      mobilePhone: this.form.value.mobilePhone,
      fax: this.form.value.fax,
    };
  }

  onFormSubmit() {
    if (this.form.invalid) {
      console.error('Form is invalid');
      return;
    }
    this.updateContactMedium();
  }
}
