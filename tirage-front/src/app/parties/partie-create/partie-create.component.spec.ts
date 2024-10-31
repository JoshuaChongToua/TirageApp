import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartieCreateComponent } from './partie-create.component';

describe('PartieCreateComponent', () => {
  let component: PartieCreateComponent;
  let fixture: ComponentFixture<PartieCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartieCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartieCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
