import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LibraryService } from './library.service';
import { HttpClientModule } from '@angular/common/http';
import { UserHomeComponent } from './user-home/user-home.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { UserSearchComponent } from './user-search/user-search.component';
import { BookSearchComponent } from './book-search/book-search.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { IssueConfirmationComponent } from './issue-confirmation/issue-confirmation.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AddBookComponent } from './add-book/add-book.component';
import { BookIssueAdminComponent } from './book-issue-admin/book-issue-admin.component';
import { PaymentListComponent } from './payment-list/payment-list.component';
import { IssueListComponent } from './issue-list/issue-list.component';
import { BookReturnComponent } from './book-return/book-return.component';
import { BookListComponent } from './book-list/book-list.component';
import { UserListComponent } from './user-list/user-list.component';
import { ReturnDetailsComponent } from './return-details/return-details.component';
import { UserHistoryComponent } from './user-history/user-history.component';
import { UserReserveHistoryComponent } from './user-reserve-history/user-reserve-history.component';
import { UserPaymentHistoryComponent } from './user-payment-history/user-payment-history.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    PageNotFoundComponent,
    UserHomeComponent,
    AdminHomeComponent,
    UserSearchComponent,
    BookSearchComponent,
    BookDetailsComponent,
    UserDetailsComponent,
    IssueConfirmationComponent,
    AddUserComponent,
    AddBookComponent,
    BookIssueAdminComponent,
    PaymentListComponent,
    IssueListComponent,
    BookReturnComponent,
    BookListComponent,
    UserListComponent,
    ReturnDetailsComponent,
    UserHistoryComponent,
    UserReserveHistoryComponent,
    UserPaymentHistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [LibraryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
