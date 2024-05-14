import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

type ButtonType = 'button' | 'submit' | 'reset';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() type: ButtonType = 'button';
  @Input() buttonClasses: string = '';
  @Input() disabled: boolean = false;
}
