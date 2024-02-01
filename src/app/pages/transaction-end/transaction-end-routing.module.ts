import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransactionEndPage } from './transaction-end.page';

const routes: Routes = [
  {
    path: '',
    component: TransactionEndPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionEndPageRoutingModule {}
