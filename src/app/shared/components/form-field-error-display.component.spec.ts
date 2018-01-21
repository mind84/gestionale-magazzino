import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFieldErrorDisplayComponent } from './form-field-error-display.component';

describe('FormFieldErrorDisplayComponent', () => {
  let component: FormFieldErrorDisplayComponent;
  let fixture: ComponentFixture<FormFieldErrorDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormFieldErrorDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFieldErrorDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
