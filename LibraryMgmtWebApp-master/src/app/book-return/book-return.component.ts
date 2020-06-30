import { Component, OnInit } from '@angular/core';
import { LibraryService } from '../library.service';
import { Router } from '@angular/router';
import { UserNdBookId, KVPair } from 'src/interface/IUsers';
declare var $: any;
@Component({
  selector: 'app-book-return',
  templateUrl: './book-return.component.html',
  styleUrls: ['./book-return.component.css']
})
export class BookReturnComponent implements OnInit {
  username: string;
  bookname: string;
  idObj: UserNdBookId = new UserNdBookId();
  modalMsgBody: string;
  modalMsgHeader: string;
  userKVPair: KVPair[];
  bookKVPair: KVPair[];
  selectedUser = null;
  selectedBook = null;
  constructor(private _libService: LibraryService,
    private router: Router) { }

  ngOnInit() {
    this.userKVPair = [];
    this.bookKVPair = [];
    this._libService.getUserKVP().subscribe(out => {
      this.userKVPair = out;
        this._libService.getBookKVP().subscribe(outBook => {
        this.bookKVPair = outBook;
      });
    });
  }
  onLogout(){
    localStorage.removeItem('loggedUser');
    this.router.navigate(['/login']);
  }
  // selectUserHandler(event: any){
  //   this.idObj.userId = event.target.value;
  //   // this._libService.getBookIssueKVP(this.idObj.userId).subscribe(out2 => {
  //   //   this.bookKVPair = out2;
  //   // })
  // }

  // selectBookHandler(event: any){
  //   this.idObj.bookId = event.target.value
  // }

  // onContinue(){
  //   this._libService.verifyUserName(this.username).subscribe(userId => {
  //     if(userId > 0){
  //       this._libService.verifyBookName(this.bookname).subscribe(bookId => {
  //         if (bookId > 0){
  //           this.idObj.userId = userId;
  //           this.idObj.bookId = bookId
  //           this._libService.verifyBookIssue(this.idObj).subscribe(issueId => {
  //             if(issueId > 0){
  //               this.router.navigate(['/return-details/'+issueId]);
  //             } 
  //             else {
  //               this.modalMsgHeader="Sorry!"
  //               this.modalMsgBody="Found no records of given user for this book!";
  //               $("#bookReturnModal").modal('show');
  //             }
  //           })
  //         }
  //         else {
  //           this.modalMsgHeader="Failed!"
  //           this.modalMsgBody="Invalid Book Name!";
  //           $("#bookReturnModal").modal('show');
  //         }
  //       })
  //     } else {
  //         this.modalMsgHeader="Failed!"
  //         this.modalMsgBody="Invalid User Name!";
  //         $("#bookReturnModal").modal('show');
  //       }
  //   })
  // }
  onContinue() {
    this.idObj.userId = this.selectedUser;
    this.idObj.bookId = this.selectedBook;
    this._libService.verifyBookIssue(this.idObj).subscribe(issueId => {
      if (issueId > 0) {
        this.router.navigate(['/return-details/' + issueId]);
      }
      else {
        this.modalMsgHeader = "Sorry!"
        this.modalMsgBody = "Found no records of given user for this book!";
        $("#bookReturnModal").modal('show');
      }
    })
  }
}
