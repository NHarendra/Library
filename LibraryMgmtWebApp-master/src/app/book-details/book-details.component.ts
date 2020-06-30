import { Component, OnInit } from '@angular/core';
import { LibraryService } from '../library.service';
import { LibBooks, LibUsers, BookReserve, UserNdBookId } from 'src/interface/IUsers';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  bookList: LibBooks[];
  loggedUser: LibUsers;
  maxLimit: number;
  modalCheck: boolean;
  modalBody: string;
  modalHeader: string;
  issuedBook: LibBooks;
  booksOccupied: number;
  currentDate: Date = new Date();
  releaseDate: Date;
  reserve: BookReserve = new BookReserve();
  idObj: UserNdBookId = new UserNdBookId();
  constructor(
    private _libService: LibraryService,
    private router: Router) { }

  ngOnInit() {
    this.bookList = [];
    this._libService.getBookList().subscribe(data => {
      this.bookList = data;
      // this._libService.userObs$.subscribe(user => {
        this.loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
        if (this.loggedUser.typeOfUser.toLowerCase() == "silver") {
          this.maxLimit = 5;
        }
        else if (this.loggedUser.typeOfUser.toLowerCase() == "gold") {
          this.maxLimit = 7;
        }
        else if (this.loggedUser.typeOfUser.toLowerCase() == "platinum") {
          this.maxLimit = 10;
        }
  
        this.booksOccupied = (this.loggedUser.activeBooksIssued === null) ? 0 : this.loggedUser.activeBooksIssued;
        this.booksOccupied += (this.loggedUser.booksReserved === null) ? 0 : this.loggedUser.booksReserved;
        // if (this.maxLimit > this.booksOccupied) {
        //   this.modalCheck = true;
        // }
        // else {
        //   this.modalCheck = false;
        // }
    });
  }
  // sendBook(tBook: LibBooks){
  //   this.issuedBook = tBook;
  //   //$('#myModal').modal('show');
  // }
  onLogout(){
    localStorage.removeItem('loggedUser');
    this.router.navigate(['/login']);
  }
  addDays(date: Date, days: number) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
  onIssueClick(issuedbook: LibBooks) {
    if (this.maxLimit > this.booksOccupied) {
      this.router.navigate(['/issue-confirmation', issuedbook.bookId, this.loggedUser.userId]);
    }
    else {
      this.modalHeader = "Sorry!";
      this.modalBody = "Limit exceeded! Please return some books to issue new one!";
      $("#bookDetailModal").modal('show');
    }
  }

  onReserveClick(reservedBook: LibBooks) {
    if (this.maxLimit > this.booksOccupied) {
      if (reservedBook.isActive && reservedBook.quantity > 1) {
        this.idObj.bookId = reservedBook.bookId;
        this.idObj.userId = this.loggedUser.userId;
        this._libService.verifyReserveBook(this.idObj).subscribe(out1 => {
          if (out1 == 0) {
            this._libService.verifyBookIssue(this.idObj).subscribe(out => {
              if(out == 0) { 
                this.releaseDate = this.addDays(this.currentDate, 2);
                this.reserve.userId = this.loggedUser.userId;
                this.reserve.bookId = reservedBook.bookId;
                this.reserve.startDate = this.currentDate;
                this.reserve.endDate = this.releaseDate;
                this.reserve.isActive = true;
                this.loggedUser.booksReserved = (this.loggedUser.booksReserved === null)? 0: this.loggedUser.booksReserved;
                this.loggedUser.booksReserved++;
                this.booksOccupied++;
                if (reservedBook.quantity == 1) {
                  reservedBook.quantity--;
                  reservedBook.isActive = false;
                } else {
                  reservedBook.quantity--;
                }
                this._libService.reserveBook(this.reserve).subscribe(out2 => {
                  if (out2 == 1) {
                    this._libService.updateUser(this.loggedUser).subscribe(out3 => {
                      if (out3 == 1) {
                        this._libService.updateBookQty(reservedBook).subscribe(out4 => {
                          if (out4 == 1) {
                            this.modalHeader = "Success!";
                            this.modalBody = reservedBook.bookName + " Successfully Reserved! It will automatically get released after 48 hrs.!";
                            $("#bookDetailModal").modal('show');
                          } else {
                            this.modalHeader = "Failed!";
                            this.modalBody = "Update Book Failed!";
                            $("#bookDetailModal").modal('show');
                          }
                        });
                      } else {
                        this.modalHeader = "Failed!";
                        this.modalBody = "Update User Failed!";
                        $("#bookDetailModal").modal('show');
                      }
                    });
                  } else {
                    this.modalHeader = "Failed!";
                    this.modalBody = "Book Reserve Operation Failed!";
                    $("#bookDetailModal").modal('show');
                  }
                });
              } else {
                this.modalHeader = "Aborted!";
                this.modalBody = "Since this book is already issued, you cannot reserve it!";
                $("#bookDetailModal").modal('show');
              }
            });
          }
          else {
            this.modalHeader = "Aborted!";
            this.modalBody = "This book is already reserved by User!";
            $("#bookDetailModal").modal('show');
          }
        });

      } else {
        this.modalHeader = "Sorry!";
        this.modalBody = "Book is currently unavailable! Regret for the inconvenience caused!";
        $("#bookDetailModal").modal('show');
      }
    } else {
      this.modalHeader = "Aborted!";
      this.modalBody = "Limit exceeded! Please return some books to reserve new one!";
      $("#bookDetailModal").modal('show');
    }
  }
}
