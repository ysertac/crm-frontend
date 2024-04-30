import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactMediumComponent } from './contact-medium.component';

describe('ContactMediumComponent', () => {
  let component: ContactMediumComponent;
  let fixture: ComponentFixture<ContactMediumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactMediumComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContactMediumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
