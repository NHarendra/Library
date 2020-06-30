import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
import { LibBooks, LibUsers } from 'src/interface/IUsers';
import { LibraryService } from '../library.service';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {
  books$: Observable<LibBooks[]>;
  id: number;
  currentUser: LibUsers;
  private searchBookTerms = new Subject<string>();
  constructor(private _libraryService: LibraryService,
    private router: Router) { }

  // findBook(bookName: string): void {
  //   this.searchBookTerms.next(bookName);
  // }
  ngOnInit(): void {
    $("body").css({"background-image": "url('/assets/images/library-bg2.jpg')",
    "background-repeat": "no-repeat",
    "background-position": "center",
    "background-attachment": "fixed",
    "-webkit-background-size": "cover",
    "-moz-background-size": "cover",
    "background-size": "cover",
    "-o-background-size": "cover",
    "opacity": 0.85});
    this.currentUser = JSON.parse(localStorage.getItem('loggedUser'));
    this.id = this.currentUser.userId;
  //     this.books$ = this.searchBookTerms.pipe(
  //      // wait 300ms after each keystroke before considering the term
  //     debounceTime(300),
  //      // ignore new term if same as previous term
  //     distinctUntilChanged(),
  //      // switch to new search observable each time the term changes
  //      switchMap((bookName2: string) => this._libraryService.searchBook(bookName2)),
  // )
  }
  onLogout(){
    localStorage.removeItem('loggedUser');
    this.router.navigate(['/login']);
  }
}
