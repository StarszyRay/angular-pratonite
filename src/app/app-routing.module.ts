import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {MainComponent} from './modules/main/main.component';
import {LoginRegisterComponent} from './modules/login-register/login-register.component';
import {MyProfileComponent} from './modules/my-profile/my-profile.component';
import {MyProfileDataComponent} from './modules/my-profile/data/data.component';
import {MyProfileStepsComponent} from './modules/my-profile/steps/steps.component';
import {CreatorComponent} from './modules/creator/creator.component';
import {MyProfileCreatorDetailsComponent} from './modules/my-profile/creator-details/creator-details.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'login', component: LoginRegisterComponent },
  { path: 'moj_profil', component: MyProfileComponent, children: [
      { path: '', redirectTo: 'dane', pathMatch: 'full' },
      { path: 'dane', component: MyProfileDataComponent },
      { path: 'szczeble', component: MyProfileStepsComponent },
      { path: 'czszegoly_tworcy', component: MyProfileCreatorDetailsComponent }
      ]},
  { path: 'tworca/:uid', component: CreatorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
