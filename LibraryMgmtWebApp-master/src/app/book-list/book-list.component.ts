import { Component, OnInit } from '@angular/core';
import { LibraryService } from '../library.service';
import { LibBooks } from 'src/interface/IUsers';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  bookList: LibBooks[];
  constructor(private _libService: LibraryService,
    private router: Router) { }

  ngOnInit() {
    this.bookList=[];
    this._libService.getBookList().subscribe(data =>
      {
        this.bookList = data;
      });
  }
  onLogout(){
    localStorage.removeItem('loggedUser');
    this.router.navigate(['/login']);
  }
}
