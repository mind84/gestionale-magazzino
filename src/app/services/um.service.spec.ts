import { TestBed, inject } from '@angular/core/testing';

import { UmService } from './um.service';

describe('UmService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UmService]
    });
  });

  it('should be created', inject([UmService], (service: UmService) => {
    expect(service).toBeTruthy();
  }));
});
