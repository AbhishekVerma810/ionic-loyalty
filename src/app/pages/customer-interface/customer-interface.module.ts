import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StorageService } from 'src/app/services/storage.service';
import { IonicModule } from '@ionic/angular';

import { CustomerInterfacePageRoutingModule } from './customer-interface-routing.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CustomerInterfacePage } from './customer-interface.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomerInterfacePageRoutingModule
  ],
  providers:[StorageService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [CustomerInterfacePage]
})
export class CustomerInterfacePageModule {}
