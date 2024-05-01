import { Component } from '@angular/core';
import { InputComponent } from '../../../../shared/components/input/input.component';

@Component({
  selector: 'app-customer-info-update-form',
  standalone: true,
  imports: [InputComponent],
  templateUrl: './customer-info-update-form.component.html',
  styleUrl: './customer-info-update-form.component.scss',
})
export class CustomerInfoUpdateFormComponent {}
