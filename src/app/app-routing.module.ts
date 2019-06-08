import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from './modules/main/main.component';
import {LoginRegisterComponent} from './modules/login-register/login-register.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'login', component: LoginRegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
