import { TestBed } from '@angular/core/testing';

import { AddNoteAvisService } from './add-note-avis.service';

describe('AddNoteAvisService', () => {
  let service: AddNoteAvisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddNoteAvisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
