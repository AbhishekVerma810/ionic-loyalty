import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'business-id-page',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'code-screen',
    loadChildren: () => import('./pages/code-screen/code-screen.module').then( m => m.CodeScreenPageModule)
  },
  {
    path: 'welcome-screen',
    loadChildren: () => import('./pages/welcome-screen/welcome-screen.module').then( m => m.WelcomeScreenPageModule)
  },
  {
    path: 'customer-interface',
    loadChildren: () => import('./pages/customer-interface/customer-interface.module').then( m => m.CustomerInterfacePageModule)
  },
  {
    path: 'transaction-end',
    loadChildren: () => import('./pages/transaction-end/transaction-end.module').then( m => m.TransactionEndPageModule)
  },
  {
    path: 'business-id-page',
    loadChildren: () => import('./pages/business-id-page/business-id-page.module').then( m => m.BusinessIdPagePageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
