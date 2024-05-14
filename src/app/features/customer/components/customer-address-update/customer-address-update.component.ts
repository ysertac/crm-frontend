import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PostAddressRequest } from '../../models/address/post-address-request';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-customer-address-update',
  standalone: true,
  imports: [
    InputComponent,
    ButtonComponent,
    RouterLink,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './customer-address-update.component.html',
  styleUrl: './customer-address-update.component.scss',
})
export class CustomerAddressUpdateComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store<{ customerAddress: PostAddressRequest }>,
    private change: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    //..
  }
}
