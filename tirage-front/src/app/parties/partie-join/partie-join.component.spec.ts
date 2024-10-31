import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartieJoinComponent } from './partie-join.component';

describe('PartieJoinComponent', () => {
  let component: PartieJoinComponent;
  let fixture: ComponentFixture<PartieJoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartieJoinComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartieJoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
