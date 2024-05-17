import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
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
import {
  setCustomerAddress,
  setCustomerAddresses,
} from '../../../../shared/store/addresses/customer-address.action';
import { selectCustomerAddress } from '../../../../shared/store/addresses/customer-address.selector';
import { PostAddressRequest } from '../../models/address/post-address-request';
import { CommonModule, Location } from '@angular/common';
import { ErrorMessagesPipe } from '../../../../core/pipe/error-messages.pipe';
import { CountryApiService } from '../../services/country-api.service';
import { GetAllCountryResponse } from '../../models/country/get-all-country-response';
import { CityApiService } from '../../services/city-api.service';
import { GetAllCityByCountryIdResponse } from '../../models/city/get-all-city-by-country-id-response';
import { GetAllDistrictByCityIdResponse } from '../../models/District/get-all-district-by-city-id-response';
import { DistrictApiService } from '../../services/district-api.service';
import { NumbersOnlyDirective } from '../../../../core/directives/numbers-only.directive';
import { OnlyNumbersPipe } from '../../../../core/pipe/only-numbers.pipe';

@Component({
  selector: 'app-customer-address-create',
  standalone: true,
  imports: [
    InputComponent,
    ButtonComponent,
    RouterLink,
    ReactiveFormsModule,
    CommonModule,
    ErrorMessagesPipe,
  ],
  templateUrl: './customer-address-create.component.html',
  styleUrl: './customer-address-create.component.scss',
})
export class CustomerAddressCreateComponent implements OnInit {
  form!: FormGroup;
  selectedCityOption: string;
  cityOptions: GetAllCityByCountryIdResponse[];
  selectedDistrictOption: string;
  districtOptions: GetAllDistrictByCityIdResponse[];
  selectedCountryOption: string;
  countryOptions: GetAllCountryResponse[];
  addressesToShow: any[];
  form2: FormGroup;
  outerLoop: number;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store<{ customerAddress: PostAddressRequest }>,
    private change: ChangeDetectorRef,
    private countryApiService: CountryApiService,
    private cityApiService: CityApiService,
    private districtApiService: DistrictApiService
  ) {}

  chooseCountry() {
    this.cityApiService.getByCountryId(this.form.value.country).subscribe({
      next: (response) => {
        this.cityOptions = response;
        this.form.get('city').enable();
      },
      complete: () => {
        //this.change.markForCheck();
      },
    });
  }

  chooseCity() {
    this.districtApiService.getByCityId(this.form.value.city).subscribe({
      next: (response) => {
        this.districtOptions = response;
        this.form.get('district').enable();
      },
      complete: () => {
        //this.change.markForCheck();
      },
    });
  }

  ngOnInit(): void {
    this.createForm();
    this.countryApiService.get().subscribe({
      next: (response) => {
        this.countryOptions = response;
      },
      complete: () => {
        //this.change.markForCheck();
      },
    });

    this.store
      .pipe(select(selectCustomerAddress))
      .subscribe({
        next: (customerAddress) => {
          this.form.patchValue(customerAddress.customerAddress);
          this.addressesToShow = customerAddress.customerAddresses;
          this.outerLoop = this.outerLoop = Math.ceil(this.addressesToShow.length / 2);
          //this.change.markForCheck();
        },
      })
      .unsubscribe();
  }

  createForm() {
    this.form = this.fb.group({
      country: ['', Validators.required],
      city: [{ value: '', disabled: true }, Validators.required],
      neighbourhood: ['', Validators.required],
      houseNumber: ['', Validators.required],
      district: [{ value: '', disabled: true }, Validators.required],
      street: ['', Validators.required],
      description: ['', Validators.required],
    });
    this.form2 = this.fb.group({
      selectedAddress: [''],
    });
  }

  createAddress() {
    const customerAddress: any = {
      customerId: '',
      countryName: this.countryOptions.find(
        (country) => country.id == this.form.value.country
      ).name,
      neighbourhood: this.form.value.neighbourhood,
      houseNumber: this.form.value.houseNumber,
      countryId: this.form.value.country,
      cityId: this.form.value.city,
      cityName: this.cityOptions.find((city) => city.id == this.form.value.city)
        .name,
      districtId: this.form.value.district,
      districtName: this.districtOptions.find(
        (district) => district.id == this.form.value.district
      ).name,
      street: this.form.value.street,
      description: this.form.value.description,
    };

    this.addressesToShow = [...this.addressesToShow, customerAddress];
    //this.change.markForCheck();
    this.form.reset();
    this.outerLoop = Math.ceil(this.addressesToShow.length / 2)
  }

  goPrevious() {
    const customerAddress: PostAddressRequest = {
      customerId: '',
      countryId: this.form.value.country,
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
      customerId: '',
      countryId: this.form.value.country,
      cityId: this.form.value.city,
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
}
