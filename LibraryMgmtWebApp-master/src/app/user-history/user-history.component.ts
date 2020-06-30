import { Component, OnInit } from '@angular/core';
import { LibraryService } from '../library.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BookIssue } from 'src/interface/IUsers';

@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.css']
})
export class UserHistoryComponent implements OnInit {
  userIssueList: BookIssue[];
  userId: number;
  constructor(private _libService: LibraryService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.userIssueList = [];
    this.userId = parseInt(this.route.snapshot.paramMap.get('id'));
    this._libService.getIssueByUserId(this.userId).subscribe(t => {
      this.userIssueList = t;
    });
  }
  onLogout(){
    localStorage.removeItem('loggedUser');
    this.router.navigate(['/login']);
  }
}
