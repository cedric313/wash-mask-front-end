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

  constructor(private maskService: MaskService) { }

  ngOnInit() {
    this.idMemberFamily = this.maskService.idMemberFamilyToCreateMask;
    console.log(this.idMemberFamily);
    this.getMaskOfMember();
  }


  createMask() {
    this.maskService.createMask(this.idMemberFamily, this.mask).subscribe(
        value => {console.log(value)},
        error => {},
        () => {console.log('finish')}
    );
  }

  getMaskOfMember(){
    this.maskService.findMaskByMember(this.idMemberFamily).subscribe(value => {this.masksOfMember = value},
        error => {},
        () => {console.log('finit masques members')});
  }

  addWashToMask(idMask) {
    this.maskService.addWashToMask(idMask).subscribe(
        value => {this.isSubmit = true},
        error => {},
        () => {this.getMaskOfMember(), this.isSubmit = false}
    );
  }

  sousWashToMask(idMask) {
    this.maskService.sousWashToMask(idMask).subscribe(
        value => {this.isSubmit = true},
        error => {},
        () => {this.getMaskOfMember(), this.isSubmit = false}
    );
  }
}
