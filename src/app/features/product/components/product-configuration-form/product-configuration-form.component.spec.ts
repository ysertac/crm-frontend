import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductConfigurationFormComponent } from './product-configuration-form.component';

describe('ProductConfigurationFormComponent', () => {
  let component: ProductConfigurationFormComponent;
  let fixture: ComponentFixture<ProductConfigurationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductConfigurationFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductConfigurationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
