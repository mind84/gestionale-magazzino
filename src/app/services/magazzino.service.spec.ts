import { TestBed, inject } from '@angular/core/testing';

import { MagazzinoService } from './magazzino.service';

describe('MagazzinoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MagazzinoService]
    });
  });

  it('should be created', inject([MagazzinoService], (service: MagazzinoService) => {
    expect(service).toBeTruthy();
  }));
});
