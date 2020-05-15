import { Component, OnInit } from '@angular/core';
import {FamilymembersService} from '../services/familymembers.service';
import {FamilyMembers} from '../FamilyMembers';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-family',
  templateUrl: './family.page.html',
  styleUrls: ['./family.page.scss'],
})
export class FamilyPage implements OnInit {
  member: FamilyMembers = new FamilyMembers();
  buttonText: any = "Back";
  buttonIcon: any = "arrow-back";
  familymemberfromDb = [];

  constructor(private familymembersService: FamilymembersService, private userService: UserService) { }

  ngOnInit() {
    console.log(this.userService.user.familyMembers);
    this.familymemberfromDb = this.userService.user.familyMembers;
  }

  createFamilyMember(){
    this.familymembersService.createFamilyMember(this.member).subscribe(
        value => {console.log(value)},error => {},() => console.log("finish"));
  }

}
