import { Component, OnInit } from '@angular/core';
import { BookReserve } from 'src/interface/IUsers';
import { LibraryService } from '../library.service';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  reserveArr: BookReserve[];
  modalHeader: string;
  modalBody: string;
  constructor(private _libService: LibraryService,
   private router: Router) { }

  ngOnInit() {
    $("body").css({"background-image": "url('/assets/images/library-bg2.jpg')",
    "background-repeat": "no-repeat",
    "background-position": "center",
    "background-attachment": "fixed",
    "-webkit-background-size": "cover",
    "-moz-background-size": "cover",
    "background-size": "cover",
    "-o-background-size": "cover",
    "opacity": 0.85});
  }
  onLogout(){
    localStorage.removeItem('loggedUser');
    this.router.navigate(['/login']);
  }
  onRelease() {
    this.reserveArr = [];
    this._libService.getReserveList().subscribe(arr => {
    this.reserveArr = arr;
    if(this.reserveArr != null && this.reserveArr.length > 0) {
      for (let r of this.reserveArr) {
        r.book.quantity++;
        this._libService.updateBookQty(r.book).subscribe(out1 => {
          if(out1 == 1){
            r.user.booksReserved--;
            this._libService.updateUser(r.user).subscribe(out2 => {
              if(out2 == 1){
                r.isActive = false;
                this._libService.updateReserve(r).subscribe(final => {
                  if (final == 1){
                    this.modalHeader = "Hurray!";
                    this.modalBody = this.reserveArr.length +" Books Released Successfully!";
                    $("#releaseModal").modal('show');
                  } else {
                    this.modalHeader = "Failed!";
                    this.modalBody = "Book Release Failed!";
                    $("#releaseModal").modal('show');
                  }
                })
              } else {
                this.modalHeader = "Failed!";
                this.modalBody = "User Update Failed!";
                $("#releaseModal").modal('show');
              }
            });
          } else {
            this.modalHeader = "Failed!";
            this.modalBody = "Book Update Failed!";
            $("#releaseModal").modal('show');
          }
        });
      }
    } else {
      this.modalHeader = "Relax!";
      this.modalBody = "No Books Eligible to Release!";
      $("#releaseModal").modal('show');
    }
    });
  }
}
