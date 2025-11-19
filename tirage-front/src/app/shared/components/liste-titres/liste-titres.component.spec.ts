import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeTitresComponent } from './liste-titres.component';

describe('ListeTitresComponent', () => {
  let component: ListeTitresComponent;
  let fixture: ComponentFixture<ListeTitresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeTitresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeTitresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
