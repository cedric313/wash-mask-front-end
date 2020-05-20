import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaskPageRoutingModule } from './mask-routing.module';

import { MaskPage } from './mask.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MaskPageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [MaskPage]
})
export class MaskPageModule {}
