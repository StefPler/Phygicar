import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PotholesPage } from './potholes.page';

const routes: Routes = [
  {
    path: '',
    component: PotholesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PotholesPageRoutingModule {}
