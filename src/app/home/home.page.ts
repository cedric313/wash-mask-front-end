import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {FamilymembersService} from '../services/familymembers.service';
import {MaskService} from '../services/mask.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  user = {};
  familyMemberfromDb: any;

  constructor(private userService: UserService,
              private familymembersService: FamilymembersService,
              private maskService: MaskService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.user = this.userService.user;
    console.log(this.userService.user.familyMembers);
    this.familyMemberfromDb = this.userService.user;
  }


  goMask(index) {
    this.maskService.idMemberFamilyToCreateMask = index;
    console.log(index);
    console.log(this.maskService.idMemberFamilyToCreateMask);
    this.router.navigateByUrl('mask');
  }

}
