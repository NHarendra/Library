import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IUsers, LibUsers, LibBooks, IBookIssue, BookIssue, Payment, BookReserve, UserNdBookId, KVPair } from 'src/interface/IUsers';
import { catchError, tap } from 'rxjs/operators';
declare var $: any;
@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  private url: string = "https://localhost:44303/api/";
  
  private signupUrl: string= this.url + "users/signup";
  private userLoginUrl: string=this.url + "users/login";
  private searchBookUrl: string = this.url + "books/search";
  private bookDetailsUrl: string = this.url + "books/list";
  private bookByIdUrl: string = this.url + "books/details/";
  private bookIssueUrl: string = this.url + "issuebook/issuerequest";
  private issueDetailsUrl: string = this.url + "issuebook/list";
  private updateBookQtyUrl: string = this.url + "books/Update";
  private updateUserUrl: string = this.url + "users/Update";
  private addBookUrl: string = this.url + "books/add";
  private userListUrl: string = this.url + "users/list";
  private paymentListUrl: string = this.url + "payment/list";
  private addPayUrl: string = this.url + "payment/add";
  private verifyUserUrl: string = this.url+ "users/VerifyUser";
  private verifyBookUrl: string = this.url+ "books/VerifyBook";
  private verifyIssueUrl: string = this.url + "issuebook/VerifyIssue";
  private getIssueDetailUrl: string = this.url + "issuebook/details/";
  private userByIdUrl: string = this.url + "users/details/";
  private updateIssuebookUrl: string = this.url + "issuebook/Update";
  private reserveBookUrl: string = this.url + "bookreserve/request";
  private reserveCheckUrl: string = this.url + "bookreserve/check";
  private getReserveListUrl: string = this.url + "bookreserve/list";
  private updateReserveUrl: string = this.url + "bookreserve/Update";
  private userKVPUrl: string = this.url + "users/pair";
  private bookKVPUrl: string = this.url + "books/pair";
  private bookIssueKVPUrl: string = this.url + "issuebook/pair/";
  private getReserveUrl: string = this.url + "bookreserve/details/";
  private deleteReserveUrl: string = this.url + "bookreserve/delete/";
  private getIssueByUserUrl: string = this.url + "issuebook/userdetails/";
  private getReserveByUserUrl: string = this.url + "bookreserve/userdetails/";
  private getPaymentByUserUrl: string = this.url + "payment/userdetails/";
  private usersSearchUrl: string = this.url + "users/search/";

  userObs$: Observable<LibUsers>; 

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  } 
  constructor(private http: HttpClient) { }

  public registerUser(user: IUsers): Observable<number>{
    return this.http.post<number>(this.signupUrl,JSON.stringify(user), this.httpOptions);
  }

  getUserList(): Observable<LibUsers[]>{
    return this.http.get<LibUsers[]>(this.userListUrl);
  }

  public bookEntry(book: LibBooks): Observable<number>{
    return this.http.post<number>(this.addBookUrl,JSON.stringify(book), this.httpOptions);
  }

  public loginUser(loginCreds: string[]) : Observable<LibUsers>{
    this.userObs$ = this.http.put<LibUsers>(this.userLoginUrl, JSON.stringify(loginCreds), this.httpOptions);
    return this.userObs$;
  }

  searchBook(tBook: string): Observable<LibBooks[]>{
    if (!tBook.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<LibBooks[]>(`${this.searchBookUrl}/?name=${tBook}`);
  }

  getBookList(): Observable<LibBooks[]>{
    return this.http.get<LibBooks[]>(this.bookDetailsUrl);
  }
  
  getBookById(id: number): Observable<LibBooks>{
    return this.http.get<LibBooks>(this.bookByIdUrl + id);
  }

  issueBookToUser(issueObj: BookIssue): Observable<number>{
    return this.http.post<number>(this.bookIssueUrl, JSON.stringify(issueObj),this.httpOptions);
  }

  getIssueList(): Observable<BookIssue[]>{
    return this.http.get<BookIssue[]>(this.issueDetailsUrl,this.httpOptions);
  }

  updateBookQty(book: LibBooks): Observable<number>{
    return this.http.put<number>(this.updateBookQtyUrl, book, this.httpOptions);
  }

  updateUser(user: LibUsers): Observable<number> {
    return this.http.put<number>(this.updateUserUrl, user, this.httpOptions);
  }

  getPaymentList(): Observable<Payment[]> {
    return this.http.get<Payment[]>(this.paymentListUrl);
  }

  addPayment(payment: Payment): Observable<number>{
    return this.http.post<number>(this.addPayUrl, JSON.stringify(payment), this.httpOptions);
  }

  verifyUserName(username: string): Observable<number>{
    return this.http.post<number>(this.verifyUserUrl +"?username="+ username, this.httpOptions);
  }

  verifyBookName(bookname: string): Observable<number>{
    return this.http.post<number>(this.verifyBookUrl + "?bookname="+ bookname, this.httpOptions);
  }

  verifyBookIssue(id:UserNdBookId): Observable<number>{
    return this.http.post<number>(this.verifyIssueUrl, id, this.httpOptions);
  }

  getBookIssueDetail(id: number): Observable<BookIssue>{
    return this.http.get<BookIssue>(this.getIssueDetailUrl + id);
  }

  getUserById(id: number): Observable<LibUsers>{
    return this.http.get<LibUsers>(this.userByIdUrl + id);
  }

  updateIssueBook(issue :BookIssue): Observable<number>{
    return this.http.put<number>(this.updateIssuebookUrl,issue, this.httpOptions);
  }

  reserveBook(reserve: BookReserve): Observable<number>{
    return this.http.post<number>(this.reserveBookUrl, reserve, this.httpOptions);
  }

  verifyReserveBook(idObj:UserNdBookId): Observable<number>{
    return this.http.post<number>(this.reserveCheckUrl, idObj, this.httpOptions);
  }
  
  getReserveList(): Observable<BookReserve[]>{
    return this.http.get<BookReserve[]>(this.getReserveListUrl);
  }

  updateReserve(reserve: BookReserve): Observable<number>{
    return this.http.put<number>(this.updateReserveUrl, reserve, this.httpOptions);
  }

  getUserKVP(): Observable<KVPair[]> {
    return this.http.post<KVPair[]>(this.userKVPUrl, this.httpOptions);
  }

  getBookKVP(): Observable<KVPair[]> {
    return this.http.post<KVPair[]>(this.bookKVPUrl, this.httpOptions);
  }

  getBookIssueKVP(userId: number): Observable<KVPair[]>{
    return this.http.post<KVPair[]>(this.bookIssueKVPUrl + userId, this.httpOptions);
  }

  getReserve(reserveId: number): Observable<BookReserve>{
    return this.http.get<BookReserve>(this.getReserveUrl + reserveId);
  }

  getIssueByUserId(userId: number): Observable<BookIssue[]>{
    return this.http.post<BookIssue[]>(this.getIssueByUserUrl+userId, this.httpOptions);
  }

  getReserveByUserId(userId: number): Observable<BookReserve[]>{
    return this.http.post<BookReserve[]>(this.getReserveByUserUrl+userId, this.httpOptions);
  }

  getPaymentByUserId(userId: number): Observable<Payment[]>{
    return this.http.post<Payment[]>(this.getPaymentByUserUrl + userId, this.httpOptions);
  }

  deleteBookReserve(reserveId: number): Observable<number>{
    return this.http.post<number>(this.deleteReserveUrl + reserveId, this.httpOptions);
  }

  /* GET heroes whose name contains search term */
  searchUsers(term: string): Observable<LibUsers[]> {
    if (!term.trim()) {
     // if not search term, return empty hero array.
     return of([]);
    }
    return this.http.post<LibUsers[]>(this.usersSearchUrl+"?name="+term, this.httpOptions);
    // .pipe(
    //   tap(_ => this.log(`found heroes matching "${term}"`)),
    //  catchError(this.handleError<LibUsers[]>('searchUsers', [])));
}
// private log(message: string) {
//   console.log(message);
// }
//   private handleError<T> (operation = 'operation', result?: T) {
//     return (error: any): Observable<T> => {

//       // TODO: send the error to remote logging infrastructure
//       console.error(error); // log to console instead

//       // TODO: better job of transforming error for user consumption
//       this.log(`${operation} failed: ${error.message}`);
//        // Let the app keep running by returning an empty result.
//        return of(result as T);
//   }    
// }
}
