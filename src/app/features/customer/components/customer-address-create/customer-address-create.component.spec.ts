import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAddressCreateComponent } from './customer-address-create.component';

describe('CustomerAddressCreateComponent', () => {
  let component: CustomerAddressCreateComponent;
  let fixture: ComponentFixture<CustomerAddressCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerAddressCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerAddressCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
