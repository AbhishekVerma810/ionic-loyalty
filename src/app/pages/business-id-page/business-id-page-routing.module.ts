import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BusinessIdPagePage } from './business-id-page.page';

const routes: Routes = [
  {
    path: '',
    component: BusinessIdPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusinessIdPagePageRoutingModule {}
