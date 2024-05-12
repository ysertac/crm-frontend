import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContactMediumApiService } from '../../services/contact-medium-api.service';
import { PostContactMediumRequest } from '../../models/contact-medium/post-contact-medium-request';
import { Store } from '@ngrx/store';
import { GetContactMediumResponse } from '../../models/contact-medium/get-contact-medium-response';
import { setContactMedium } from '../../../../shared/store/contactMedium/contact-medium.action';

@Component({
  selector: 'app-contact-medium',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './contact-medium.component.html',
  styleUrl: './contact-medium.component.scss',
})
export class ContactMediumComponent implements OnInit {
  customerId: string;
  contactMediumDetail: GetContactMediumResponse;

  constructor(
    private contactMediumApiService: ContactMediumApiService,
    private store: Store<{ contactMedium: PostContactMediumRequest }>
  ) {}

  ngOnInit(): void {
    this.getById();
  }

  getById() {
    this.contactMediumApiService
      .getById('b1bea412-93a7-48ef-866d-e1963197d303')
      .subscribe({
        next: (response) => {
          this.contactMediumDetail = response;
          this.createContactMedium(response);
        },
        error: (error) => {
          console.error('Error:', error);
        },
      });
  }

  createContactMedium(response: GetContactMediumResponse) {
    const contactMedium: PostContactMediumRequest = {
      customerId: '',
      email: response.email,
      homePhone: response.homePhone,
      mobilePhone: response.mobilePhone,
      fax: response.fax,
    };
    this.store.dispatch(setContactMedium({ contactMedium }));
  }
}
