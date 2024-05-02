import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contact-medium',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './contact-medium.component.html',
  styleUrl: './contact-medium.component.scss',
})
export class ContactMediumComponent {
  customers: any[] = [
    {
      id: '987654321',
      customerId: '1',
      email: 'melsa@gmail.com',
      accountNumber: 'ACC987654',
      mobilePhone: '5551234567',
      firstName: 'John',
      middleName: 'abc',
      role: 'Customer',
      lastName: 'Doe',
      fax: '887666788',
      orderName: 'Product A',
    },
  ];
}
