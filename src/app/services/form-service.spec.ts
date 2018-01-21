import { TestBed, inject } from '@angular/core/testing';

import { FormService } from './form-service.spec';

describe('FormServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormService]
    });
  });

  it('should be created', inject([FormService], (service: FormService) => {
    expect(service).toBeTruthy();
  }));
});
