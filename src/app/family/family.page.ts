import { Component, OnInit } from '@angular/core';
import {FamilymembersService} from '../services/familymembers.service';
import {FamilyMembers} from '../FamilyMembers';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';
import {MaskService} from '../services/mask.service';

@Component({
  selector: 'app-family',
  templateUrl: './family.page.html',
  styleUrls: ['./family.page.scss'],
})
export class FamilyPage implements OnInit {
  member: FamilyMembers = new FamilyMembers();
  buttonText: any = "Back";
  buttonIcon: any = "arrow-back";
  familyMemberfromDb: any;

  constructor(private familymembersService: FamilymembersService,
              private userService: UserService,
              private maskService: MaskService,
              private router: Router) { }

  ngOnInit() {
    console.log(this.userService.user.familyMembers);
    this.familyMemberfromDb = this.userService.user;
  }

  createFamilyMember(){
    const subscription = this.familymembersService.createFamilyMember(this.member).subscribe(
        value => this.userService.user.familyMembers.push(value),
            error => {},
        () => {this.member.firstName = "", subscription.unsubscribe()});
  }

  goMask(index) {
    this.maskService.idMemberFamilyToCreateMask = index;
    console.log(index);
    console.log(this.maskService.idMemberFamilyToCreateMask);
    this.router.navigateByUrl('mask');
  }

}
