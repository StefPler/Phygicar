import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PotholesPageRoutingModule } from './potholes-routing.module';

import { PotholesPage } from './potholes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PotholesPageRoutingModule
  ],
  declarations: [PotholesPage]
})
export class PotholesPageModule {}
