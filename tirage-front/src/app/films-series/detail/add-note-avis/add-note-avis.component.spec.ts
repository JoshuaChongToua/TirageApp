import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNoteAvisComponent } from './add-note-avis.component';

describe('AddNoteAvisComponent', () => {
  let component: AddNoteAvisComponent;
  let fixture: ComponentFixture<AddNoteAvisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNoteAvisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNoteAvisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
