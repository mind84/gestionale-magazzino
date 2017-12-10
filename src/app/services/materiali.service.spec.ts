import { TestBed, inject } from '@angular/core/testing';

import { MaterialiService } from './materiali.service';

describe('MaterialiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MaterialiService]
    });
  });

  it('should be created', inject([MaterialiService], (service: MaterialiService) => {
    expect(service).toBeTruthy();
  }));
});
