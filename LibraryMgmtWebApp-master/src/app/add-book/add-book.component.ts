import { Component, OnInit } from '@angular/core';
import { LibraryService } from '../library.service';
import { Router } from '@angular/router';
import { LibBooks } from 'src/interface/IUsers';
declare var $: any;
@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  book: LibBooks = new LibBooks();
  modalMsgHeader: string;
  modalMsgBody: string;
  constructor(  
    private _libService: LibraryService,
    private router: Router) { }

  ngOnInit() {
  }

  onLogout(){
    localStorage.removeItem('loggedUser');
    this.router.navigate(['/login']);
  }

  onClear(){
    this.book.bookName = null;
    this.book.author = null;
    this.book.rent = null;
    this.book.price = null;
    this.book.quantity = null;
  }
  onAddBook(){
    this._libService.bookEntry(this.book).subscribe(out => {
      if(out == 1){
        if(out==1){
          this.modalMsgHeader = "Success!";
          this.modalMsgBody = this.book.bookName + " added successfully!";
          $("#bookAddModal").modal('show');
          // this.router.navigate(['/login']);
        }
        else {
          this.modalMsgHeader = "Failed!";
          this.modalMsgBody = this.book.bookName + " entry was unsuccessful! Please try again later!";
          $("#bookAddModal").modal('show');
        }
      }
    })
  }
}
