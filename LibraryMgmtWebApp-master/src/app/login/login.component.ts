import { Component, OnInit } from '@angular/core';
import { LibraryService } from '../library.service';
import { Router } from '@angular/router';
import { LibUsers } from 'src/interface/IUsers';
declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUserCreds: string[] = new Array(2);
  modalMsgBody: string;
  modalMsgHeader: string;
  user: LibUsers;
  constructor(
    private _libService: LibraryService,
    private router: Router) { }

  ngOnInit() {
    $('body').css({'background-image': 'none'});
  }
  
  onLogin() {
    if(localStorage.getItem('loggedUser') !== null) {
      localStorage.removeItem('loggedUser');
    }
    this._libService.loginUser(this.loginUserCreds).subscribe(out => { 
      if(out == null){
        this.modalMsgHeader = "Login Attemp Failed!"
        this.modalMsgBody = "Incorrect Username or Password! Please enter valid username and password!";
        $("#loginModal").modal('show');
      }
      else{
        localStorage.setItem('loggedUser', JSON.stringify(out));
        console.log(JSON.parse(localStorage.getItem('loggedUser')));
        this.user = JSON.parse(localStorage.getItem('loggedUser'));
        if(this.user.userRole.toLowerCase() == "user"){
          this.router.navigate(['/user-home']);
        }
        else if(this.user.userRole.toLowerCase() == "admin"){
          this.router.navigate(['/admin-home']);
        }
        
      }
      });
  }
}
