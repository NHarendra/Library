import { Component, OnInit } from '@angular/core';
import { LibraryService } from '../library.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LibUsers, IUsers } from 'src/interface/IUsers';
declare var $: any;
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  mobPattern: string = "^((\\+91-?)|0)?[0-9]{10}$";
  userSignupObj: LibUsers = new LibUsers();
  signUpRes: number;
  modalMsgBody: string;
  modalMsgHeader: string;
  constructor(
    private _libService: LibraryService,
    private router: Router
    // private route: ActivatedRoute
  ) { }

  ngOnInit() {
    $('body').css({'background-image': 'none'});
  }

  selectChangeHandler(event: any) {
    this.userSignupObj.typeOfUser = event.target.value;
  }

  onSignUp() {
    this._libService.registerUser(this.userSignupObj).subscribe(out => {
      this.signUpRes = out;
      if (this.signUpRes == 1) {
        this.modalMsgHeader = "Success!";
        this.modalMsgBody = this.userSignupObj.userName + " registered successfully!";
        $("#userAddModal").modal('show');
        // this.router.navigate(['/login']);
      }
      else if (this.signUpRes == -1) {
        this.modalMsgHeader = "Failed!";
        this.modalMsgBody = this.userSignupObj.userName + " is already registered!";
        $("#userAddModal").modal('show');
      }
      else {
        this.modalMsgHeader = "Failed!";
        this.modalMsgBody = this.userSignupObj.userName + " registration unsuccessful! Please try again later!";
        $("#userAddModal").modal('show');
      }
    });
  }

}

