import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartiesRejointsComponent } from './parties-rejoints.component';

describe('PartiesRejointsComponent', () => {
  let component: PartiesRejointsComponent;
  let fixture: ComponentFixture<PartiesRejointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartiesRejointsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartiesRejointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
