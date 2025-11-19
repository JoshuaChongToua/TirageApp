import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeTitresDragComponent } from './liste-titres-drag.component';

describe('ListeTitresDragComponent', () => {
  let component: ListeTitresDragComponent;
  let fixture: ComponentFixture<ListeTitresDragComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeTitresDragComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeTitresDragComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
