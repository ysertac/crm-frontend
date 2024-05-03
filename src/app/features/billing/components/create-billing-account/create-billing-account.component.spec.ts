import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBillingAccountComponent } from './create-billing-account.component';

describe('CreateBillingAccountComponent', () => {
  let component: CreateBillingAccountComponent;
  let fixture: ComponentFixture<CreateBillingAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateBillingAccountComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateBillingAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
