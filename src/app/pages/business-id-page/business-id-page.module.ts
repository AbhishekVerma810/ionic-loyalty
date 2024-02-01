import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

import { BusinessIdPagePageRoutingModule } from './business-id-page-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { BusinessIdPagePage } from './business-id-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    BusinessIdPagePageRoutingModule
  ],
  declarations: [BusinessIdPagePage]
})
export class BusinessIdPagePageModule {}
