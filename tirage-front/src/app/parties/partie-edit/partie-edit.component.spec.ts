import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartieEditComponent } from './partie-edit.component';

describe('PartieEditComponent', () => {
  let component: PartieEditComponent;
  let fixture: ComponentFixture<PartieEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartieEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartieEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
