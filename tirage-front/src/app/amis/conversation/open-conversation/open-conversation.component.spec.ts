import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenConversationComponent } from './open-conversation.component';

describe('OpenConversationComponent', () => {
  let component: OpenConversationComponent;
  let fixture: ComponentFixture<OpenConversationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpenConversationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenConversationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
