import { TestBed } from '@angular/core/testing';

import { MesPartiesService } from './mes-parties.service';

describe('MesPartiesService', () => {
  let service: MesPartiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MesPartiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
