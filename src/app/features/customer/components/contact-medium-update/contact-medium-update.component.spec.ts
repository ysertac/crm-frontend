import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactMediumUpdateComponent } from './contact-medium-update.component';

describe('ContactMediumUpdateComponent', () => {
  let component: ContactMediumUpdateComponent;
  let fixture: ComponentFixture<ContactMediumUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactMediumUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContactMediumUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
