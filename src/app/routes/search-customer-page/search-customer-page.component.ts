import { Component } from '@angular/core';
import { InputComponent } from '../../shared/components/input/input.component';
import { ButtonComponent } from '../../shared/components/button/button.component';

@Component({
  selector: 'app-search-customer-page',
  standalone: true,
  templateUrl: './search-customer-page.component.html',
  styleUrl: './search-customer-page.component.scss',
  imports: [InputComponent, ButtonComponent],
})
export class SearchCustomerPageComponent {}
