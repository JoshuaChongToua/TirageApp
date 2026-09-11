import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LolComponent } from './lol.component';

describe('LolComponent', () => {
  let component: LolComponent;
  let fixture: ComponentFixture<LolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LolComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
