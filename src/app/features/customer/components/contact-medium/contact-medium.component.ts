import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ContactMediumApiService } from '../../services/contact-medium-api.service';
import { PostContactMediumRequest } from '../../models/contact-medium/post-contact-medium-request';
import { Store } from '@ngrx/store';
import { setContactMedium } from '../../../../shared/store/contactMedium/contact-medium.action';
import { GetContactMediumByCustomerIdResponse } from '../../models/contact-medium/get-contact-medium-by-customer-id-response';

@Component({
  selector: 'app-contact-medium',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './contact-medium.component.html',
  styleUrl: './contact-medium.component.scss',
})
export class ContactMediumComponent implements OnInit {
  customerId: string;
  contactMediumDetail: GetContactMediumByCustomerIdResponse;

  constructor(
    private contactMediumApiService: ContactMediumApiService,
    private router: Router,
    private store: Store<{ contactMedium: PostContactMediumRequest }>
  ) {}

  ngOnInit(): void {
    const customerId = this.router.url.split('/')[3];
    this.getById(customerId);
  }

  getById(customerId: string) {
    this.contactMediumApiService.getById(customerId).subscribe({
      next: (response) => {
        this.contactMediumDetail = response;
        this.createContactMedium(response);
        console.log(response);
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }

  createContactMedium(response: GetContactMediumByCustomerIdResponse) {
    const contactMedium: PostContactMediumRequest = {
      customerId: response.customerId,
      email: response.email,
      homePhone: response.homePhone,
      mobilePhone: response.mobilePhone,
      fax: response.fax,
    };
    this.store.dispatch(setContactMedium({ contactMedium }));
  }
}
