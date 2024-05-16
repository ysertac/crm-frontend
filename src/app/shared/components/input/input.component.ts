import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
type InputType =
  | 'text'
  | 'email'
  | 'number'
  | 'password'
  | 'checkbox'
  | 'radio'
  | 'date';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {
  @Input() type: InputType = 'text';
  @Input() placeholder: string = '';
  @Input() labelClasses: string = '';
  @Input() inputClasses: string = '';
  @Input() required: boolean = false;
  @Input() inputId: string = '';
  @Input() checked: boolean = false;
  @Input() maxLength!: number;
  @Input() control: FormControl | any | null;
  @Input() change: any;

  //@Input() control: FormControl = new FormControl();
}
