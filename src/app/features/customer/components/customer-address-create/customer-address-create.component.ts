import { Component } from '@angular/core';
import { InputComponent } from '../../../../shared/components/input/input.component';

@Component({
  selector: 'app-customer-address-create',
  standalone: true,
  imports: [InputComponent],
  templateUrl: './customer-address-create.component.html',
  styleUrl: './customer-address-create.component.scss'
})
export class CustomerAddressCreateComponent {

}
