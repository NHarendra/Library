import { Component, OnInit } from '@angular/core';
import { LibUsers } from 'src/interface/IUsers';
import { LibraryService } from '../library.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  userList: LibUsers[];
  constructor(private _libService: LibraryService,
    private router: Router) { }

  ngOnInit() {
    this.userList=[];
    this._libService.getUserList().subscribe(data =>
      {
        this.userList = data;
      });
  }
  onLogout(){
    localStorage.removeItem('loggedUser');
    this.router.navigate(['/login']);
  }
}
