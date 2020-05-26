import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {User} from '../User';
import {FamilymembersService} from '../services/familymembers.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.page.html',
  styleUrls: ['./my-account.page.scss'],
})
export class MyAccountPage implements OnInit {

  buttonText: any = "Back";
  buttonIcon: any = "arrow-back";
  userFromDb : any;
  familyMembersFromDb: any;

  constructor(private userService: UserService,
              private familymembersService: FamilymembersService) { }

  ngOnInit() {
    this.userFromDb = this.userService.user;
    this.getAllFamilyMembers();
  }

  getAllFamilyMembers() {
    const subscription = this.familymembersService.findFamilyMembers().subscribe(
        value => {console.log(value), this.familyMembersFromDb = value },
        error => {},
        () => {subscription.unsubscribe()}
    )
  }
}
