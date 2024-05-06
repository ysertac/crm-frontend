import { Component } from '@angular/core';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer-address',
  standalone: true,
  imports: [InputComponent, ReactiveFormsModule],
  templateUrl: './customer-address.component.html',
  styleUrl: './customer-address.component.scss',
})
export class CustomerAddressComponent {
  constructor() {}
}
