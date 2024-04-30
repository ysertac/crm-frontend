import { Component } from '@angular/core';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-search-customer-page',
  standalone: true,
  templateUrl: './search-customer.component.html',
  styleUrl: './search-customer.component.scss',
  imports: [InputComponent, ButtonComponent],
})
export class SearchCustomerPageComponent {}
