import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCustomerPageComponent } from './search-customer-page.component';

describe('SearchCustomerPageComponent', () => {
  let component: SearchCustomerPageComponent;
  let fixture: ComponentFixture<SearchCustomerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchCustomerPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchCustomerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
