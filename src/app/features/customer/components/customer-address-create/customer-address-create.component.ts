import { Component } from '@angular/core';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-customer-address-create',
  standalone: true,
  imports: [InputComponent,ButtonComponent,RouterLink],
  templateUrl: './customer-address-create.component.html',
  styleUrl: './customer-address-create.component.scss'
})
export class CustomerAddressCreateComponent {

}
