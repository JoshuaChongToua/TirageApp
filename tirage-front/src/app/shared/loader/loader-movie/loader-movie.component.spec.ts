import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderMovieComponent } from './loader-movie.component';

describe('LoaderMovieComponent', () => {
  let component: LoaderMovieComponent;
  let fixture: ComponentFixture<LoaderMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoaderMovieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoaderMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
