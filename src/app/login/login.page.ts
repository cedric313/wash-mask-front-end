import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../User';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    user: User = new User("","");
    isAccountExist: boolean = true;

  constructor(private router: Router) { }

  ngOnInit() {

  }

    signIn() {
        let userToLog: User = new User();
        userToLog.email = this.user.email;
        userToLog.password = this.user.password;
        console.log(userToLog);
    }

  createAccount() {
    let userToLog: User = new User();
    userToLog.email = this.user.email;
    userToLog.password = this.user.password;
    userToLog.pseudo = this.user.pseudo;
    console.log(userToLog);
  }
}
