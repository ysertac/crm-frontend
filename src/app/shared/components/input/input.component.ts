import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
type InputType = 'text' | 'email' | 'number' | 'password' | 'checkbox';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {
  @Input() labelName: string = '';
  @Input() type: InputType = 'text';
  @Input() placeholder: string = '';
  @Input() labelClasses: string = '';
  @Input() inputClasses: string = '';
  @Input() required: boolean = false;
  @Input() inputId: string = '';

  //@Input() inputName: string = '';
}
