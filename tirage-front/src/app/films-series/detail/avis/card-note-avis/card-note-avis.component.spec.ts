import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardNoteAvisComponent } from './card-note-avis.component';

describe('CardNoteAvisComponent', () => {
  let component: CardNoteAvisComponent;
  let fixture: ComponentFixture<CardNoteAvisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardNoteAvisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardNoteAvisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
