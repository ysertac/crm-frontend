import { Component } from '@angular/core';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-create-billing-account',
  standalone: true,
  imports: [InputComponent, ButtonComponent],
  templateUrl: './create-billing-account.component.html',
  styleUrl: './create-billing-account.component.scss',
})
export class CreateBillingAccountComponent {}
