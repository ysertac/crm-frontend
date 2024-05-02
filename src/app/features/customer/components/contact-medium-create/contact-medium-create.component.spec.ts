import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactMediumCreateComponent } from './contact-medium-create.component';

describe('ContactMediumCreateComponent', () => {
  let component: ContactMediumCreateComponent;
  let fixture: ComponentFixture<ContactMediumCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactMediumCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContactMediumCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
