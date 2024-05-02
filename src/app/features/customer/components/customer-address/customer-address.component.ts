import { Component } from '@angular/core';
import { InputComponent } from '../../../../shared/components/input/input.component';

@Component({
  selector: 'app-customer-address',
  standalone: true,
  imports: [InputComponent],
  templateUrl: './customer-address.component.html',
  styleUrl: './customer-address.component.scss'
})
export class CustomerAddressComponent {

}
