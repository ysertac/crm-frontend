import { Component } from '@angular/core';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-create-customer-form',
  standalone: true,
  imports: [InputComponent, ButtonComponent, RouterLink],
  templateUrl: './create-customer-form.component.html',
  styleUrl: './create-customer-form.component.scss'
})
export class CreateCustomerFormComponent {

}
