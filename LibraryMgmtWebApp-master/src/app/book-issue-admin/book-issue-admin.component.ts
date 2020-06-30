import { Component, OnInit } from '@angular/core';
import { LibraryService } from '../library.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LibBooks, LibUsers, BookIssue, UserNdBookId, KVPair } from 'src/interface/IUsers';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

declare var $: any;
@Component({
  selector: 'app-book-issue-admin',
  templateUrl: './book-issue-admin.component.html',
  styleUrls: ['./book-issue-admin.component.css']
})
export class BookIssueAdminComponent implements OnInit {
  username: string;
  bookname: string;
  modalMsgHeader: string;
  modalMsgBody: string;
  idObj: UserNdBookId = new UserNdBookId();
  userKVPair: KVPair[];
  bookKVPair: KVPair[];
  selectedUser = null;
  selectedBook = null;
  users$: Observable<LibUsers[]>;
  name: string;
  listedUser: LibUsers;
  issuedBook: BookIssue;
  isListHidden: boolean = false;
  private searchTerms = new Subject<string>();
  constructor(private _libService: LibraryService,
    private router: Router,
    private route: ActivatedRoute) { }

    // Push a search term into the observable stream.
    typeAheadSearchUser(term: string): void {
      this.searchTerms.next(term);
      this.isListHidden = false;
    }

  ngOnInit() {
    this.users$ = this.searchTerms.pipe(
           // wait 300ms after each keystroke before considering the term
           debounceTime(300),

           // ignore new term if same as previous term
           distinctUntilChanged(),
     
           // switch to new search observable each time the term changes
           switchMap((term: string) => this._libService.searchUsers(term)),
    )

    this.userKVPair = [];
    this.bookKVPair = [];
    this._libService.getUserKVP().subscribe(outUser => {
      this.userKVPair = outUser;
      this._libService.getBookKVP().subscribe(outBook => {
        this.bookKVPair = outBook;
      });
    });
  }
  onLogout(){
    localStorage.removeItem('loggedUser');
    this.router.navigate(['/login']);
  }
  onContinue() {
    this.idObj.bookId = this.selectedBook;
    // this.idObj.userId = this.listedUser.userId;
    this.idObj.userId = this.selectedUser;
    this._libService.verifyBookIssue(this.idObj).subscribe(issueId => {
      if (issueId > 0) {
        this.modalMsgHeader = "Aborted!"
        this.modalMsgBody = "User has already issued this book!";
        $("#adminIssueModal").modal('show');
      }
      else {
        this.router.navigate(['/issue-confirmation', this.selectedBook, this.selectedUser]);
      }
    });
  }
  setUserName(user: LibUsers){
    this.listedUser = user;
    this.name = user.userName;
    // this.isListHidden = !this.isListHidden;
  }
  // onContinue(){
  //   this._libService.verifyUserName(this.username).subscribe(userId => {
  //     if(userId > 0){
  //       this._libService.verifyBookName(this.bookname).subscribe(bookId => {
  //         if (bookId > 0){
  //           this.idObj.userId = userId;
  //           this.idObj.bookId = bookId
  //           this._libService.verifyBookIssue(this.idObj).subscribe(issueId => {
  //             if(issueId > 0){
  //               this.modalMsgHeader="Aborted!"
  //               this.modalMsgBody="User has already issued this book!";
  //               $("#adminIssueModal").modal('show');
  //             }
  //             else {
  //               this.router.navigate(['/issue-confirmation',bookId,userId]);
  //             }
  //           })
  //         }
  //         else {
  //           this.modalMsgHeader="Failed!"
  //           this.modalMsgBody="Invalid Book Name!";
  //           $("#adminIssueModal").modal('show');
  //         }
  //       })
  //     } else {
  //         this.modalMsgHeader="Failed!"
  //         this.modalMsgBody="Invalid User Name!";
  //         $("#adminIssueModal").modal('show');
  //       }
  //   })
  // }
}
