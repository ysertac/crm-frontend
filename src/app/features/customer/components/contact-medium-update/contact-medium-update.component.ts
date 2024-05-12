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
import { PostContactMediumRequest } from '../../models/contact-medium/post-contact-medium-request';
import { Store, select } from '@ngrx/store';
import { selectContactMedium } from '../../../../shared/store/contactMedium/contact-medium.selector';
import { setContactMedium } from '../../../../shared/store/contactMedium/contact-medium.action';

@Component({
  selector: 'app-contact-medium-update',
  standalone: true,
  imports: [InputComponent, ButtonComponent, ReactiveFormsModule],
  templateUrl: './contact-medium-update.component.html',
  styleUrl: './contact-medium-update.component.scss',
})
export class ContactMediumUpdateComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private contactMediumApiService: ContactMediumApiService,
    private store: Store<{ contactMedium: PostContactMediumRequest }>
  ) {}

  ngOnInit(): void {
    this.createForm();

    this.store.pipe(select(selectContactMedium)).subscribe((contactMedium) => {
      this.form.patchValue(contactMedium);
      console.log(contactMedium);
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

  updateContactMedium() {
    const contactMedium: UpdateContactMediumRequest = {
      customerId: '95f25ca7-2cb7-4d39-870e-46d7a0e487fa',
      email: this.form.value.email,
      homePhone: this.form.value.homePhone,
      mobilePhone: this.form.value.mobilePhone,
      fax: this.form.value.fax,
    };
    this.contactMediumApiService
      .update('b1bea412-93a7-48ef-866d-e1963197d303', contactMedium)
      .subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  onFormSubmit() {
    if (this.form.invalid) {
      console.error('Form is invalid');
      return;
    }
    this.updateContactMedium();
  }
}
