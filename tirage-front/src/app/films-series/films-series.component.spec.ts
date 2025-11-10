import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmsSeriesComponent } from './films-series.component';

describe('FilmsSeriesComponent', () => {
  let component: FilmsSeriesComponent;
  let fixture: ComponentFixture<FilmsSeriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilmsSeriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilmsSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
