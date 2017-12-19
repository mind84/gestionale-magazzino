import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorieArticoliComponent } from './categorie-articoli.component';

describe('CategorieArticoliComponent', () => {
  let component: CategorieArticoliComponent;
  let fixture: ComponentFixture<CategorieArticoliComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategorieArticoliComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorieArticoliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
