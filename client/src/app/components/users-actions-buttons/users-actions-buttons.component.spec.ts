import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersActionsButtonsComponent } from './users-actions-buttons.component';

describe('UsersActionsButtonsComponent', () => {
  let component: UsersActionsButtonsComponent;
  let fixture: ComponentFixture<UsersActionsButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersActionsButtonsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsersActionsButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
