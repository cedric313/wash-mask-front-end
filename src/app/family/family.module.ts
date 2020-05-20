import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FamilyPageRoutingModule } from './family-routing.module';

import { FamilyPage } from './family.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FamilyPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [FamilyPage]
})
export class FamilyPageModule {}
