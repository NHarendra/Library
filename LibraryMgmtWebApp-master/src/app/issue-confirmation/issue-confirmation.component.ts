import { Component, OnInit } from '@angular/core';
import { LibraryService } from '../library.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LibBooks, BookIssue, IBookIssue, LibUsers, UserNdBookId } from 'src/interface/IUsers';
declare var $: any;
@Component({
  selector: 'app-issue-confirmation',
  templateUrl: './issue-confirmation.component.html',
  styleUrls: ['./issue-confirmation.component.css']
})
export class IssueConfirmationComponent implements OnInit {
  private lBookId: number;
  private lUserId: number;
  book: LibBooks = new LibBooks();
  libUser: LibUsers = new LibUsers();
  loggedUser: LibUsers = new LibUsers();
  returnDate: Date;
  totalRent: number;
  modalHeader: string;
  modalBody: string;
  BookIssueObj: BookIssue = new BookIssue();
  currentDate: Date = new Date();
  idObj: UserNdBookId = new UserNdBookId();
  resultId: number;
  routeLink: string;
  reserveId: number;
  role:string;
  maxLimit: number;
  booksOccupied: number;
  constructor(
    private _libService: LibraryService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.lBookId = parseInt(this.route.snapshot.paramMap.get('bookId'));
    this.lUserId = parseInt(this.route.snapshot.paramMap.get('userId'))
    this._libService.getBookById(this.lBookId).subscribe(bookData => {
      this.book = bookData;
      this.BookIssueObj.bookId = this.book.bookId;
      this.returnDate = this.addDays(this.currentDate, 15);
      this.totalRent = this.book.rent * 15;
      this._libService.getUserById(this.lUserId).subscribe(user => {
        this.BookIssueObj.userId = user.userId;
        this.libUser = user;
        this.idObj.bookId = this.BookIssueObj.bookId;
        this.idObj.userId = this.BookIssueObj.userId;
        this._libService.verifyBookIssue(this.idObj).subscribe(res => {
          this.resultId = res;
          this._libService.verifyReserveBook(this.idObj).subscribe(outReserve => {
            this.reserveId = outReserve;
            this.loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
            if(this.libUser.typeOfUser.toLowerCase() === "silver") {
              this.maxLimit = 5;
            } else if (this.libUser.typeOfUser.toLowerCase() === "gold") {
              this.maxLimit = 7;
            } else if (this.libUser.typeOfUser.toLowerCase() === "platinum") {
              this.maxLimit = 10;
            }
            this.booksOccupied = (this.libUser.activeBooksIssued == null) ? 0 : this.libUser.activeBooksIssued;
            this.booksOccupied += (this.libUser.booksReserved == null) ? 0 : this.libUser.booksReserved;
            // this._libService.getUserById(this.idObj.userId).subscribe(user => {
            //   this.loggedUser = user;
            // });
          });
        });
      });
    });
  }

  public addDays(date: Date, days: number) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  onLogout(){
    localStorage.removeItem('loggedUser');
    this.router.navigate(['/login']);
  }

  onCancel(){
    this.role = this.loggedUser.userRole;
    if(this.role.toLowerCase() === "user"){
      this.router.navigate(['/user-home']);
    } else if(this.role.toLowerCase() === "admin"){
      this.router.navigate(['/admin-home']);
    }
    // if (this.loggedUser.userRole.toLowerCase() == "user") {
    //   this.router.navigate(['/user-home']);
    // }
    // else {
    //   this.router.navigate(['/admin-home']);
    // }
  }

  onContinueClick() {
    if(this.maxLimit > this.booksOccupied) { 
    if (this.resultId == 0) {
      if (this.book.isActive && this.book.quantity > 0) {
        this.BookIssueObj.bookId = this.book.bookId;
        this.BookIssueObj.dateOfIssue = this.currentDate;
        this.BookIssueObj.dateOfReturn = this.returnDate;
        this.BookIssueObj.totalRent = this.totalRent;
        this.BookIssueObj.isReturned = false;
        if (this.reserveId > 0) {
          this.book.quantity++;
          this.libUser.booksReserved--;
          this._libService.getReserve(this.reserveId).subscribe(reserveObj => {
            reserveObj.endDate = this.currentDate;
            reserveObj.isActive = false;
            this._libService.updateReserve(reserveObj).subscribe(result => {
              if (result == 1) {
                console.log('BookReserve Updated!');
              } else {
                this.modalHeader = "Failed!";
                this.modalBody = "Reserve Update Failed!";
                $("#issueConfirmationModal").modal('show');
              }
              this._libService.issueBookToUser(this.BookIssueObj).subscribe(res => {
                if (res == 1) {
                  console.log('Book Issued!');
      
                  if (this.book.quantity == 1) {
                    this.book.quantity--;
                    this.book.isActive = false;
                  }
                  else {
                    this.book.quantity--;
                  }
                  this.libUser.activeBooksIssued = (this.libUser.activeBooksIssued === null)? 0: this.libUser.activeBooksIssued;
                  this.libUser.activeBooksIssued++;
                  this._libService.updateBookQty(this.book).subscribe(res2 => {
                    if (res2 == 1) {
                      this._libService.updateUser(this.libUser).subscribe(res3 => {
                        if (res3 == 1) {
                          this.modalHeader = "Success!";
                          this.modalBody = this.book.bookName + " is issued to " + this.libUser.userName + ". Return book before" + this.returnDate + " to avoid fine!";
                          $("#issueConfirmationModal").modal('show');
                        }
                        else {
                          console.log("Update Book Issued by User Failed!");
                          this.modalHeader = "Failed!";
                          this.modalBody = "Update Book Issued by User Failed!";
                          $("#issueConfirmationModal").modal('show');
                        }
                      })
                    }
                    else {
                      console.log("Update Book Qty Failed!");
                      this.modalHeader = "Failed!";
                      this.modalBody = "Update Book Qty Failed!";
                      $("#issueConfirmationModal").modal('show');
                    }
                  });
                }
                else {
                  console.log('Book Issue Failed!');
                  this.modalHeader = "Failed!";
                  this.modalBody = "Book Issue Failed!";
                  $("#issueConfirmationModal").modal('show');
                }
              });
            });
          });
        } else {
          this._libService.issueBookToUser(this.BookIssueObj).subscribe(res => {
            if (res == 1) {
              console.log('Book Issued!');
              this.booksOccupied++;
              if (this.book.quantity == 1) {
                this.book.quantity--;
                this.book.isActive = false;
              }
              else {
                this.book.quantity--;
              }
              this.libUser.activeBooksIssued++;
              this._libService.updateBookQty(this.book).subscribe(res2 => {
                if (res2 == 1) {
                  this._libService.updateUser(this.libUser).subscribe(res3 => {
                    if (res3 == 1) {
                      this.modalHeader = "Success!";
                      this.modalBody = this.book.bookName + " is issued to " + this.libUser.userName + ". Return book before" + this.returnDate + " to avoid fine!";
                      $("#issueConfirmationModal").modal('show');
                    }
                    else {
                      console.log("Update Book Issued by User Failed!");
                      this.modalHeader = "Failed!";
                      this.modalBody = "Update Book Issued by User Failed!";
                      $("#issueConfirmationModal").modal('show');
                    }
                  })
                }
                else {
                  console.log("Update Book Qty Failed!");
                  this.modalHeader = "Failed!";
                  this.modalBody = "Update Book Qty Failed!";
                  $("#issueConfirmationModal").modal('show');
                }
              });
            }
            else {
              console.log('Book Issue Failed!');
              this.modalHeader = "Failed!";
              this.modalBody = "Book Issue Failed!";
              $("#issueConfirmationModal").modal('show');
            }
          });
        }
      }

      else {
        this.modalHeader = "Sorry!";
        this.modalBody = this.book.bookName + "is not available!";
        $("#issueConfirmationModal").modal('show');
      }

    } else {
      this.modalHeader = "Aborted!";
      this.modalBody = this.book.bookName + " is already issued by " + this.libUser.userName;
      $("#issueConfirmationModal").modal('show');
    }
  } else {
    this.modalHeader = "Aborted!";
    this.modalBody = "Limit exceeded! Please return some books to issue new one!";
    $("#issueConfirmationModal").modal('show');
  }
}
}
