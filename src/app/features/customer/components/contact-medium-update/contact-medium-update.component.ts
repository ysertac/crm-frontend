import { Component } from '@angular/core';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-contact-medium-update',
  standalone: true,
  imports: [InputComponent, ButtonComponent],
  templateUrl: './contact-medium-update.component.html',
  styleUrl: './contact-medium-update.component.scss',
})
export class ContactMediumUpdateComponent {
  email: string = '';
  homePhone: string = '';
  mobilePhone: string = '';
  fax: string = '';
}
