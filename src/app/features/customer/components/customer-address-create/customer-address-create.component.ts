import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { CustomerApiService } from '../../services/customer-api.service';
import {
  setCustomerAddress,
  setCustomerAddresses,
} from '../../../../shared/store/addresses/customer-address.action';
import { selectCustomerAddress } from '../../../../shared/store/addresses/customer-address.selector';
import { PostAddressRequest } from '../../models/address/post-address-request';
import { CommonModule, Location } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-customer-address-create',
  standalone: true,
  imports: [
    InputComponent,
    ButtonComponent,
    RouterLink,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './customer-address-create.component.html',
  styleUrl: './customer-address-create.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerAddressCreateComponent implements OnInit {
  form!: FormGroup;
  selectedCityOption: string;
  cityOptions: string[] = ['Hatay', 'Ankara', 'İzmir'];
  selectedDistrictOption: string;
  districtOptions: string[] = ['Antakya', 'Etimesgut', 'Urla'];
  selectedCountryOption: string;
  countryOptions: string[] = ['Türkiye', 'KKTC'];
  addressesToShow: PostAddressRequest[];
  form2: FormGroup;
  index: number = -2;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store<{ customerAddress: PostAddressRequest }>,
    private change: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log('a');
    this.createForm();
    this.store
      .pipe(select(selectCustomerAddress))
      .subscribe({
        next: (customerAddress) => {
          this.form.patchValue(customerAddress.customerAddress);
          this.addressesToShow = customerAddress.customerAddresses;
          this.change.markForCheck();
          console.log(customerAddress);
        },
      })
      .unsubscribe();
  }

  createForm() {
    this.form = this.fb.group({
      country: [''],
      cityId: ['', Validators.required],
      neighbourhood: ['', Validators.required],
      houseNumber: ['', Validators.required],
      district: ['', Validators.required],
      street: ['', Validators.required],
      description: ['', Validators.required],
    });
    this.form2 = this.fb.group({
      selectedAddress: [''],
    });
  }

  createAddress() {
    const customerAddress: PostAddressRequest = {
      customerId: '',
      neighbourhood: this.form.value.neighbourhood,
      houseNumber: this.form.value.houseNumber,
      countryId: this.form.value.country,
      cityId: this.form.value.cityId,
      districtId: this.form.value.district,
      street: this.form.value.street,
      description: this.form.value.description,
    };
    console.log(customerAddress);

    this.addressesToShow = [...this.addressesToShow, customerAddress];
    //this.store.dispatch(setCustomerAddress({ customerAddress }));
    //this.store.dispatch(setCustomerAddresses({ customerAddresses: this.addressesToShow}));
    this.change.markForCheck();
    this.form.reset();
    this.index = -2;
  }

  goPrevious() {
    const customerAddress: PostAddressRequest = {
      countryId: '',
      customerId: '',
      cityId: this.form.value.cityId,
      neighbourhood: this.form.value.neighbourhood,
      houseNumber: this.form.value.houseNumber,
      districtId: this.form.value.district,
      street: this.form.value.street,
      description: this.form.value.description,
    };
    this.store.dispatch(setCustomerAddress({ customerAddress }));
    this.store.dispatch(
      setCustomerAddresses({ customerAddresses: this.addressesToShow })
    );
    this.router.navigate(['/home/create-customer']);
  }

  goNext() {
    const customerAddress: PostAddressRequest = {
      countryId: '',
      customerId: '',
      cityId: this.form.value.cityId,
      neighbourhood: this.form.value.neighbourhood,
      houseNumber: this.form.value.houseNumber,
      districtId: this.form.value.district,
      street: this.form.value.street,
      description: this.form.value.description,
    };
    this.store.dispatch(setCustomerAddress({ customerAddress }));
    this.store.dispatch(
      setCustomerAddresses({ customerAddresses: this.addressesToShow })
    );
    this.router.navigate(['/home/contact-medium-create']);
  }

  onFormSubmit() {
    if (this.form.invalid) {
      console.error('Form is invalid');
      return;
    }
    this.createAddress();
  }

  getNumberArray(): number[] {
    return new Array(Math.ceil(this.addressesToShow.length / 2)).fill(0);
  }

  getAddresses(): PostAddressRequest[] {
    this.index += 2;
    return this.addressesToShow.slice(this.index, this.index + 2);
  }
}
