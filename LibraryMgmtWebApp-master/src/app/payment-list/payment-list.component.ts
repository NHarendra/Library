import { Component, OnInit } from '@angular/core';
import { LibraryService } from '../library.service';
import { Payment } from 'src/interface/IUsers';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css']
})
export class PaymentListComponent implements OnInit {
  payList: Payment[];
  constructor(private _libService: LibraryService,
   private router: Router) { }

  ngOnInit() {
    this.payList=[];
    this._libService.getPaymentList().subscribe(data =>
      {
        this.payList = data;
      });
  }
  onLogout(){
    localStorage.removeItem('loggedUser');
    this.router.navigate(['/login']);
  }
}
