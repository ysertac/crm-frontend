import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerInfoUpdateFormComponent } from './customer-info-update-form.component';

describe('CustomerInfoUpdateFormComponent', () => {
  let component: CustomerInfoUpdateFormComponent;
  let fixture: ComponentFixture<CustomerInfoUpdateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerInfoUpdateFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerInfoUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
