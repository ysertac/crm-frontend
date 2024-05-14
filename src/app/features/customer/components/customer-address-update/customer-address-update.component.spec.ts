import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAddressUpdateComponent } from './customer-address-update.component';

describe('CustomerAddressUpdateComponent', () => {
  let component: CustomerAddressUpdateComponent;
  let fixture: ComponentFixture<CustomerAddressUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerAddressUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerAddressUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
