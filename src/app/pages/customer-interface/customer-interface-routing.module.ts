import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerInterfacePage } from './customer-interface.page';

const routes: Routes = [
  {
    path: '',
    component: CustomerInterfacePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerInterfacePageRoutingModule {}
