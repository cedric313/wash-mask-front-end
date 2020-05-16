import { Component, OnInit } from '@angular/core';
import {MaskService} from '../services/mask.service';
import {Mask} from '../Mask';

@Component({
  selector: 'app-mask',
  templateUrl: './mask.page.html',
  styleUrls: ['./mask.page.scss'],
})
export class MaskPage implements OnInit {

  isSubmit: boolean = false;
  buttonText: any = "Back";
  buttonIcon: any = "arrow-back";
  idMemberFamily: any = -1;
  mask: Mask = new Mask();
  masksOfMember = [];
  isWantCreateMask: any = false;

  constructor(private maskService: MaskService) { }

  ngOnInit() {
    this.idMemberFamily = this.maskService.idMemberFamilyToCreateMask;
    this.getMaskOfMember();
  }

  wantCreateMask(){
    this.isWantCreateMask = !this.isWantCreateMask;
  }


  createMask() {
    const subscription = this.maskService.createMask(this.idMemberFamily, this.mask).subscribe(
        value => {console.log(value)},
        error => {},
        () => {this.getMaskOfMember(),
            this.isWantCreateMask = false,
            this.mask.name = "",
            this.mask.maxWashingMask = null,
            subscription.unsubscribe()}
    );
  }

  getMaskOfMember(){
    const subscription  = this.maskService.findMaskByMember(this.idMemberFamily).subscribe(
        value => {this.masksOfMember = value},
        error => {},
        () => {subscription.unsubscribe()});

  }

  addWashToMask(idMask) {
    const subscription = this.maskService.addWashToMask(idMask).subscribe(
        value => {this.isSubmit = true},
        error => {},
        () => {this.getMaskOfMember(), this.isSubmit = false, subscription.unsubscribe()}
    );
  }

  sousWashToMask(idMask) {
    const subscription = this.maskService.sousWashToMask(idMask).subscribe(
        value => {this.isSubmit = true},
        error => {},
        () => {this.getMaskOfMember(), this.isSubmit = false, subscription.unsubscribe()}
    );
  }

  deleteMask(idMask) {
    const subscription = this.maskService.deleteMask(idMask).subscribe(
        response => {console.log(response)},
        error => {console.log(error)},
        () => {this.getMaskOfMember(),subscription.unsubscribe()}
    );

  }
}
