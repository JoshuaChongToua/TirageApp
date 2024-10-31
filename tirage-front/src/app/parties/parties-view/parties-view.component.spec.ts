import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartiesViewComponent } from './parties-view.component';

describe('PartiesViewComponent', () => {
  let component: PartiesViewComponent;
  let fixture: ComponentFixture<PartiesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartiesViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartiesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
