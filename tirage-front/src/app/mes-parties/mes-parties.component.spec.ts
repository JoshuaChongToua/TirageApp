import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesPartiesComponent } from './mes-parties.component';

describe('MesPartiesComponent', () => {
  let component: MesPartiesComponent;
  let fixture: ComponentFixture<MesPartiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MesPartiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesPartiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
