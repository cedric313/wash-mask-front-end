import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mask',
  templateUrl: './mask.page.html',
  styleUrls: ['./mask.page.scss'],
})
export class MaskPage implements OnInit {
  buttonText: any = "Back";
  buttonIcon: any = "arrow-back";
  constructor() { }

  ngOnInit() {
  }

}
