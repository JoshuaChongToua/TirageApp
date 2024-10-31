import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesPartiesSouhaitsComponent } from './mes-parties-souhaits.component';

describe('MesPartiesSouhaitsComponent', () => {
  let component: MesPartiesSouhaitsComponent;
  let fixture: ComponentFixture<MesPartiesSouhaitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MesPartiesSouhaitsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesPartiesSouhaitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
