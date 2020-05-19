import { Component, OnInit } from '@angular/core';
import {FamilymembersService} from '../services/familymembers.service';
import {FamilyMembers} from '../FamilyMembers';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';
import {MaskService} from '../services/mask.service';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-family',
  templateUrl: './family.page.html',
  styleUrls: ['./family.page.scss'],
})
export class FamilyPage implements OnInit {

  member: FamilyMembers = new FamilyMembers();
  buttonText: any = "Back";
  buttonIcon: any = "arrow-back";
  familyMembersFromDb: any;
  isWantCreateMemberFamily = false;

  constructor(private familymembersService: FamilymembersService,
              private userService: UserService,
              private maskService: MaskService,
              private router: Router,
              private alertCtrl: AlertController) { }

  ngOnInit() {
    console.log(this.userService.user.familyMembers);
    this.getAllFamilyMembers();
  }

  getAllFamilyMembers() {
    const subscription = this.familymembersService.findFamilyMembers().subscribe(
        value => {console.log(value), this.familyMembersFromDb = value },
        error => {},
        () => {subscription.unsubscribe()}
    )
  }

  createFamilyMember(){
    const subscription = this.familymembersService.createFamilyMember(this.member).subscribe(
        value => this.userService.user.familyMembers.push(value),
            error => {},
        () => {this.member.firstName = "",
            this.isWantCreateMemberFamily = false,
            this.getAllFamilyMembers(),
            subscription.unsubscribe()});
  }

  goMask(index) {
    this.maskService.idMemberFamilyToCreateMask = index;
    console.log(index);
    console.log(this.maskService.idMemberFamilyToCreateMask);
    this.router.navigateByUrl('mask');
  }

    wantCreateMemberFamily() {
        this.isWantCreateMemberFamily = !this.isWantCreateMemberFamily;
    }

  deleteMember(idMember) {
    const subscription = this.familymembersService.deleteMember(idMember).subscribe(
        response => {console.log(response)},
        error => {console.log(error)},
        () => {this.getAllFamilyMembers(), subscription.unsubscribe()}
    );
  }

  async showAlertDeletedMember(idMember) {
    const confirm = await this.alertCtrl.create({
      header: 'Delete member family',
      message: 'Are you sure?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {

            console.log('Confirm Cancel');
          }
        },
        {
          text: 'Okay',
          handler: () => {
            {this.deleteMember(idMember), console.log("confirm user")};
          }
        }
      ]
    });
    await confirm.present();
  }
}
