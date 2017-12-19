import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UmisuraComponent } from './umisura.component';

describe('UmisuraComponent', () => {
  let component: UmisuraComponent;
  let fixture: ComponentFixture<UmisuraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UmisuraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UmisuraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
