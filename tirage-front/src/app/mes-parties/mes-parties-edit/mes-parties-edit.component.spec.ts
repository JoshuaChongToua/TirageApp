import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesPartiesEditComponent } from './mes-parties-edit.component';

describe('MesPartiesEditComponent', () => {
  let component: MesPartiesEditComponent;
  let fixture: ComponentFixture<MesPartiesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MesPartiesEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesPartiesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
