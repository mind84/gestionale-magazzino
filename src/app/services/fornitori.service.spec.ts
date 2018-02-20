import { TestBed, inject } from '@angular/core/testing';

import { FornitoriService } from './fornitori.service';

describe('FornitoriService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FornitoriService]
    });
  });

  it('should be created', inject([FornitoriService], (service: FornitoriService) => {
    expect(service).toBeTruthy();
  }));
});
