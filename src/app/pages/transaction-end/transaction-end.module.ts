import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransactionEndPageRoutingModule } from './transaction-end-routing.module';

import { TransactionEndPage } from './transaction-end.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransactionEndPageRoutingModule
  ],
  declarations: [TransactionEndPage]
})
export class TransactionEndPageModule {}
