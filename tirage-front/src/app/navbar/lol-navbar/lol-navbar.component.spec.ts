import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LolNavbarComponent } from './lol-navbar.component';

describe('LolNavbarComponent', () => {
  let component: LolNavbarComponent;
  let fixture: ComponentFixture<LolNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LolNavbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LolNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
