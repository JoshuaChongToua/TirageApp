import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesPartiesViewComponent } from './mes-parties-view.component';

describe('MesPartiesViewComponent', () => {
  let component: MesPartiesViewComponent;
  let fixture: ComponentFixture<MesPartiesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MesPartiesViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesPartiesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
