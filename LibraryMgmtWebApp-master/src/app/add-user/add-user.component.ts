import { Component, OnInit } from '@angular/core';
import { LibUsers } from 'src/interface/IUsers';
import { Router } from '@angular/router';
import { LibraryService } from '../library.service';
declare var $: any;
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  user: LibUsers = new LibUsers();
  modalMsgHeader: string;
  modalMsgBody: string;
  constructor(
    private _libService: LibraryService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  
  selectChangeHandler(event: any){
    this.user.typeOfUser = event.target.value;
  }
  onLogout(){
    localStorage.removeItem('loggedUser');
    this.router.navigate(['/login']);
  }
  onClear(){
    this.user.userName = null;
    this.user.address = null;
    this.user.phoneNo = null;
    this.user.password = null;
  }
  onAddUser(){
    this._libService.registerUser(this.user).subscribe(out => {
      if (out == 1) {
        this.modalMsgHeader = "Success!";
        this.modalMsgBody = this.user.userName + " registered successfully!";
        $("#userAddModal").modal('show');
        // this.router.navigate(['/login']);
      }
      else if (out == -1) {
        this.modalMsgHeader = "Failed!";
        this.modalMsgBody = this.user.userName + " is already registered!";
        $("#userAddModal").modal('show');
      }
      else {
        this.modalMsgHeader = "Failed!";
        this.modalMsgBody = this.user.userName + " registration unsuccessful! Please try again later!";
        $("#userAddModal").modal('show');
      }
    });
  }
}
