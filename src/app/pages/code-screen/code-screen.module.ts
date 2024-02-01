import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CodeScreenPageRoutingModule } from './code-screen-routing.module';

import { CodeScreenPage } from './code-screen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CodeScreenPageRoutingModule
  ],
  declarations: [CodeScreenPage]
})
export class CodeScreenPageModule {}
