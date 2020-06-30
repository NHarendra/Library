import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueConfirmationComponent } from './issue-confirmation.component';

describe('IssueConfirmationComponent', () => {
  let component: IssueConfirmationComponent;
  let fixture: ComponentFixture<IssueConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
