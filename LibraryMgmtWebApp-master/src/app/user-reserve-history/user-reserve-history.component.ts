import { Component, OnInit } from '@angular/core';
import { BookReserve } from 'src/interface/IUsers';
import { LibraryService } from '../library.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-reserve-history',
  templateUrl: './user-reserve-history.component.html',
  styleUrls: ['./user-reserve-history.component.css']
})
export class UserReserveHistoryComponent implements OnInit {
  userReserveList: BookReserve[];
  userId: number;
  constructor(private _libService: LibraryService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.userReserveList = [];
    this.userId = parseInt(this.route.snapshot.paramMap.get('id'));
    this._libService.getReserveByUserId(this.userId).subscribe(t => {
      this.userReserveList = t;
    });
  }
  onLogout(){
    localStorage.removeItem('loggedUser');
    this.router.navigate(['/login']);
  }
}
