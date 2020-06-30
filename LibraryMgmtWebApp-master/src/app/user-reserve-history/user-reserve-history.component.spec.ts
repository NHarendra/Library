import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserReserveHistoryComponent } from './user-reserve-history.component';

describe('UserReserveHistoryComponent', () => {
  let component: UserReserveHistoryComponent;
  let fixture: ComponentFixture<UserReserveHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserReserveHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserReserveHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
