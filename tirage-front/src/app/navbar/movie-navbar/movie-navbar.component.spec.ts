import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieNavbarComponent } from './movie-navbar.component';

describe('MovieNavbarComponent', () => {
  let component: MovieNavbarComponent;
  let fixture: ComponentFixture<MovieNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieNavbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
