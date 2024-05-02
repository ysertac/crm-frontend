import { Component } from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-customer-account',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './customer-account.component.html',
  styleUrl: './customer-account.component.scss'
})
export class CustomerAccountComponent {

  isCollapsed = true;

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }
}
