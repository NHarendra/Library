import { Component, OnInit } from '@angular/core';
import { LibraryService } from '../library.service';
import { BookIssue } from 'src/interface/IUsers';
import { Router } from '@angular/router';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.css']
})
export class IssueListComponent implements OnInit {
  issueList: BookIssue[];
  constructor(private _libService: LibraryService,
    private router: Router) { }

  ngOnInit() {
    this.issueList=[];
    this._libService.getIssueList().subscribe(data =>
      {
        this.issueList = data;
      });
  }  
  onLogout(){
    localStorage.removeItem('loggedUser');
    this.router.navigate(['/login']);
  }
  onReturn(issue: BookIssue){
    this.router.navigate(['/return-details/' + issue.issueId]);
  }
}
