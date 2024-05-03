import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { InputComponent } from '../../../../shared/components/input/input.component';

@Component({
  selector: 'app-product-configuration-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonComponent, InputComponent],
  templateUrl: './product-configuration-form.component.html',
  styleUrl: './product-configuration-form.component.scss'
})
export class ProductConfigurationFormComponent {

}
