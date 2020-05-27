import { Component, OnInit } from '@angular/core';
import {MaskService} from '../services/mask.service';
import {Mask} from '../Mask';
import {AlertController, LoadingController} from '@ionic/angular';
import {FormBuilder, Validators} from '@angular/forms';
import {FamilymembersService} from '../services/familymembers.service';

@Component({
  selector: 'app-mask',
  templateUrl: './mask.page.html',
  styleUrls: ['./mask.page.scss'],
})
export class MaskPage implements OnInit {

  isSubmit: boolean = false;
  buttonText: any = " Back";
  buttonIcon: any = "arrow-back";
  idMemberFamily: any = -1;
  firstNameMember: any = "";
  mask: Mask = new Mask();
  masksOfMember = [];
  isWantCreateMask: any = false;
  createMaskValidator: any;
  private isLoading: boolean = false;

  constructor(private maskService: MaskService,
              private familymembersService: FamilymembersService,
              private alertCtrl: AlertController,
              private formBuilder: FormBuilder,
              private loadingController: LoadingController) {
    this.createMaskValidator = this.formBuilder.group({
    name: ['', Validators.required],
      numberWash: ['', Validators.required],
  });}

  ngOnInit() {
    this.idMemberFamily = this.maskService.idMemberFamilyToCreateMask;
    this.getFirstNameMember();
    this.getMaskOfMember();
  }

  getFirstNameMember(){
   const subscription = this.familymembersService.getFirstName(this.idMemberFamily).subscribe(
        value => {this.firstNameMember = value},
        error => {console.log(error)},
        () => {console.log('complet recup firstname member'),
            this.dismiss(),
            subscription.unsubscribe()}
    )
  }

  wantCreateMask(){
    this.isWantCreateMask = !this.isWantCreateMask;
  }


  createMask() {
    this.present();
    const subscription = this.maskService.createMask(this.idMemberFamily, this.mask).subscribe(
        value => {console.log(value)},
        error => {this.dismiss(),
          console.log(error.error.message)
        },
        () => {this.getMaskOfMember(),
            this.isWantCreateMask = false,
            this.mask.name = "",
            this.mask.maxWashingMask = null,
            this.dismiss(),
            subscription.unsubscribe()}
    );
  }

  getMaskOfMember(){
    this.present();
    const subscription  = this.maskService.findMaskByMember(this.idMemberFamily).subscribe(
        value => {this.masksOfMember = value},
        error => {this.dismiss()},
        () => {this.dismiss(),console.log(this.masksOfMember),subscription.unsubscribe()});

  }

  addWashToMask(idMask) {
    this.present();
    const subscription = this.maskService.addWashToMask(idMask).subscribe(
        value => {this.isSubmit = true},
        error => {this.dismiss()},
        () => {this.dismiss(),this.getMaskOfMember(), this.isSubmit = false, subscription.unsubscribe()}
    );
  }

  sousWashToMask(idMask) {
    this.present();
    const subscription = this.maskService.sousWashToMask(idMask).subscribe(
        value => {this.isSubmit = true},
        error => {this.dismiss()},
        () => {this.dismiss(),this.getMaskOfMember(), this.isSubmit = false, subscription.unsubscribe()}
    );
  }

  deleteMask(idMask) {
    this.present();
    const subscription = this.maskService.deleteMask(idMask).subscribe(
        response => {console.log(response)},
        error => {this.dismiss(),console.log(error)},
        () => {this.getMaskOfMember(),this.dismiss(),subscription.unsubscribe()}
    );
  }


  async showAlertDeletedMask(idMask) {
    const confirm = await this.alertCtrl.create({
      header: 'Delete mask',
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
            {this.deleteMask(idMask), console.log("confirm user")};
          }
        }
      ]
    });
    await confirm.present();
  }

  async present() {
    this.isLoading = true;
    return await this.loadingController.create({
      // duration: 5000,
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  async dismiss() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => console.log('dismissed'));
  }
}
