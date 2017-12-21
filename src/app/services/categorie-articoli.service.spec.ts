import { TestBed, inject } from '@angular/core/testing';

import { CategorieArticoliService } from './categorie-articoli.service';

describe('CategorieArticoliService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategorieArticoliService]
    });
  });

  it('should be created', inject([CategorieArticoliService], (service: CategorieArticoliService) => {
    expect(service).toBeTruthy();
  }));
});
