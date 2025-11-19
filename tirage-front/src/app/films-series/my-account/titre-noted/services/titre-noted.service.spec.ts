import { TestBed } from '@angular/core/testing';

import { TitreNotedService } from './titre-noted.service';

describe('TitreNotedService', () => {
  let service: TitreNotedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TitreNotedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
