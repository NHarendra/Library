import { Component, OnInit } from '@angular/core';
import { Payment } from 'src/interface/IUsers';
import { LibraryService } from '../library.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-payment-history',
  templateUrl: './user-payment-history.component.html',
  styleUrls: ['./user-payment-history.component.css']
})
export class UserPaymentHistoryComponent implements OnInit {
  userPayList: Payment[];
  userId: number;
  constructor(private _libService: LibraryService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.userPayList = [];
    this.userId = parseInt(this.route.snapshot.paramMap.get('id'));
    this._libService.getPaymentByUserId(this.userId).subscribe(t => {
      this.userPayList = t;
    });
  }
  onLogout(){
    localStorage.removeItem('loggedUser');
    this.router.navigate(['/login']);
  }
}
