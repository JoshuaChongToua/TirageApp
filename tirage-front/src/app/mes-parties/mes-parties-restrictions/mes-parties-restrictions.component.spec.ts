import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesPartiesRestrictionsComponent } from './mes-parties-restrictions.component';

describe('MesPartiesRestrictionsComponent', () => {
  let component: MesPartiesRestrictionsComponent;
  let fixture: ComponentFixture<MesPartiesRestrictionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MesPartiesRestrictionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesPartiesRestrictionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
