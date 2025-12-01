import { TestBed } from '@angular/core/testing';

import { ListeAmisService } from './liste-amis.service';

describe('ListeAmisService', () => {
  let service: ListeAmisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListeAmisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
