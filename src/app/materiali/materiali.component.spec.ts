import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialiComponent } from './materiali.component';

describe('MaterialiComponent', () => {
  let component: MaterialiComponent;
  let fixture: ComponentFixture<MaterialiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
