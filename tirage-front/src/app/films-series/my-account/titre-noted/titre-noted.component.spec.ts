import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitreNotedComponent } from './titre-noted.component';

describe('TitreNotedComponent', () => {
  let component: TitreNotedComponent;
  let fixture: ComponentFixture<TitreNotedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TitreNotedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TitreNotedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
