import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from './modules/main/main.component';
import {LoginRegisterComponent} from './modules/login-register/login-register.component';
import {MyProfileComponent} from './modules/my-profile/my-profile.component';
import {MyProfileDataComponent} from './modules/my-profile/data/data.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'login', component: LoginRegisterComponent },
  { path: 'moj_profil', component: MyProfileComponent, children: [
      {path: '', component: MyProfileDataComponent},
      {path: 'dane', component: MyProfileDataComponent}
      ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
