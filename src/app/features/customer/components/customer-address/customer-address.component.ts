import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AddressApiService } from '../../services/address-api.service';
import { AddressListModel } from '../../models/address/address-list-model';
import { GetListResponse } from '../../../../shared/models/getListResponse';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-address',
  standalone: true,
  imports: [InputComponent,CommonModule,ReactiveFormsModule],
  templateUrl: './customer-address.component.html',
  styleUrl: './customer-address.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomerAddressComponent implements OnInit {
  customerAddresses: GetListResponse<AddressListModel>;
  customerId: string;
  form: FormGroup;
  loopArray: number[] = [];
  index = -2;

  constructor(private addressApiService: AddressApiService, 
    private change: ChangeDetectorRef,
    private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      selectedAddress: [''],
    });
    this.customerId = "953612d8-2f30-4bd9-bb21-91e3e0e989fb";
    this.addressApiService.get(0,2,this.customerId).subscribe({
      next: (response) => {
        this.customerAddresses = response;
        this.change.markForCheck();
        console.log(this.customerAddresses.items);
      }
    })
  }

  getNumberArray(): number[] {
    return new Array(Math.ceil(this.customerAddresses.items.length / 2)).fill(0);
  }

  getAddresses(): AddressListModel[] {
    this.index += 2;
    return this.customerAddresses.items.slice(this.index, this.index + 2);
  }
}
