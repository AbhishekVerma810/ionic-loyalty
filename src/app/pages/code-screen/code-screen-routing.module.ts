import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CodeScreenPage } from './code-screen.page';

const routes: Routes = [
  {
    path: '',
    component: CodeScreenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CodeScreenPageRoutingModule {}
