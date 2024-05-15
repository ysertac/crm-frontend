import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AddressApiService } from '../../services/address-api.service';
import { AddressListModel } from '../../models/address/address-list-model';
import { GetListResponse } from '../../../../shared/models/getListResponse';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { GetByCustomerIdAddressResponse } from '../../models/address/getbycustomerid-address-response';

@Component({
  selector: 'app-customer-address',
  standalone: true,
  imports: [InputComponent, CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './customer-address.component.html',
  styleUrl: './customer-address.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerAddressComponent implements OnInit {
  customerAddresses: GetByCustomerIdAddressResponse[] = [];
  customerId: string;
  form: FormGroup;
  loopArray: number[] = [];
  index = -2;

  constructor(
    private addressApiService: AddressApiService,
    private change: ChangeDetectorRef,
    private fb: FormBuilder,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      selectedAddress: [''],
    });

    const customerId = this.router.url.split('/')[3];
    this.getById(customerId);
  }

  getNumberArray(): number[] {
    return new Array(Math.ceil(this.customerAddresses.length / 2)).fill(
      0
    );
  }

  getAddresses(): GetByCustomerIdAddressResponse[] {
    this.index += 2;
    return this.customerAddresses.slice(this.index, this.index + 2);
  }

  getById(customerId: string) {
    this.addressApiService.getByCustomerId(customerId).subscribe({
      next: (response) => {
        this.customerAddresses = response;
        this.change.markForCheck();
        console.log(this.customerAddresses);
      },
    });
  }
}
