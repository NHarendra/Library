import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { IssueConfirmationComponent } from './issue-confirmation/issue-confirmation.component';
import { AddBookComponent } from './add-book/add-book.component';
import { AddUserComponent } from './add-user/add-user.component';
import { BookIssueAdminComponent } from './book-issue-admin/book-issue-admin.component';
import { BookReturnComponent } from './book-return/book-return.component';
import { IssueListComponent } from './issue-list/issue-list.component';
import { PaymentListComponent } from './payment-list/payment-list.component';
import { BookListComponent } from './book-list/book-list.component';
import { UserListComponent } from './user-list/user-list.component';
import { ReturnDetailsComponent } from './return-details/return-details.component';
import { UserPaymentHistoryComponent } from './user-payment-history/user-payment-history.component';
import { UserReserveHistoryComponent } from './user-reserve-history/user-reserve-history.component';
import { UserHistoryComponent } from './user-history/user-history.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'user-home', component: UserHomeComponent },
  { path: 'admin-home', component: AdminHomeComponent },
  { path: 'book-details', component: BookDetailsComponent },
  { path: 'issue-confirmation/:bookId/:userId', component: IssueConfirmationComponent },
  { path: 'add-book', component: AddBookComponent },
  { path: 'add-user', component: AddUserComponent },
  { path: 'book-issue-admin', component: BookIssueAdminComponent },
  { path: 'book-return', component: BookReturnComponent },
  { path: 'issue-list', component: IssueListComponent },
  { path: 'payment-list', component: PaymentListComponent },
  { path: 'book-list', component: BookListComponent },
  { path: 'user-list', component: UserListComponent },
  { path: 'return-details/:id', component: ReturnDetailsComponent },
  { path: 'user-payment-history/:id', component: UserPaymentHistoryComponent },
  { path: 'user-reserve-history/:id', component: UserReserveHistoryComponent },
  { path: 'user-history/:id', component: UserHistoryComponent },
  { path: '', component: LoginComponent, pathMatch:"full" },
  { path: '**', component:PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
