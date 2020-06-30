import { Component, OnInit } from '@angular/core';
import { LibraryService } from '../library.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BookIssue, LibUsers, LibBooks, Payment } from 'src/interface/IUsers';
declare var $: any;
@Component({
  selector: 'app-return-details',
  templateUrl: './return-details.component.html',
  styleUrls: ['./return-details.component.css']
})
export class ReturnDetailsComponent implements OnInit {
  issueBook: BookIssue = new BookIssue();
  users: LibUsers = new LibUsers();
  books: LibBooks = new LibBooks();
  payment: Payment = new Payment();
  issuedId: number;
  dayDiff: number;
  today = new Date();
  rtnDate;
  fine: number = 0;
  amount: number;
  modalHeader: string;
  modalBody: string;
  // today: number = Date.now();
  constructor(private _libService: LibraryService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.issuedId = parseInt(this.route.snapshot.paramMap.get('id'));
    this._libService.getBookIssueDetail(this.issuedId).subscribe(data =>{
      this.issueBook = data;
      this.rtnDate = new Date(this.issueBook.dateOfReturn);
      this.dayDiff = Math.ceil((this.today.getTime() - this.rtnDate.getTime())/(1000*3600*24));
      if(this.dayDiff > 0) {
        this.fine = this.dayDiff * 10; //fine amount = 10 per day
      }
      this.amount = this.issueBook.totalRent + this.fine;
      this._libService.getUserById(this.issueBook.userId).subscribe(data => {
        this.users = data;
        this._libService.getBookById(this.issueBook.bookId).subscribe(data => {
          this.books = data;
        });
      });
    });
  }
  onLogout(){
    localStorage.removeItem('loggedUser');
    this.router.navigate(['/login']);
  }
  onPay(){
    this.payment.userId = this.issueBook.userId;
    this.payment.bookId = this.issueBook.bookId;
    this.payment.totalRent = this.amount;
    this.payment.paymentDate = this.today;
    this.books.quantity++;
    this.users.activeBooksIssued--;
    this.issueBook.isReturned = true;
    this._libService.addPayment(this.payment).subscribe(out1 => {
      if(out1 == 1){
        this._libService.updateBookQty(this.books).subscribe(out2 => {
          if(out2 == 1) {
            this._libService.updateUser(this.users).subscribe(out3 => {
              if(out3 == 1) {
                this._libService.updateIssueBook(this.issueBook).subscribe(final => {
                  if(final == 1){
                    this.modalHeader = "Success!";
                    this.modalBody = "Payment Successful!";
                    $("#paymentModal").modal('show');
                  } else {
                    this.modalHeader = "Failed!";
                    this.modalBody = "Issue Book Update Failed!";
                    $("#paymentModal").modal('show');
                  }});
              } else {
                this.modalHeader = "Failed!";
                this.modalBody = "User Update Failed!";
                $("#paymentModal").modal('show');
              }
            });
          } else {
            this.modalHeader = "Failed!";
            this.modalBody = "Book Update Failed!";
            $("#paymentModal").modal('show');
          }
        });
      } else {
        this.modalHeader = "Failed!";
        this.modalBody = "Payment Failed!";
        $("#paymentModal").modal('show');
      }
    });    
  }
}
