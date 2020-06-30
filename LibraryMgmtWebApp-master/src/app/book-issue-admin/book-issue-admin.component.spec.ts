import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookIssueAdminComponent } from './book-issue-admin.component';

describe('BookIssueAdminComponent', () => {
  let component: BookIssueAdminComponent;
  let fixture: ComponentFixture<BookIssueAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookIssueAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookIssueAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
