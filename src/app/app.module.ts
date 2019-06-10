import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MaterialModule} from './material';
import {MainComponent} from './modules/main/main.component';
import {NavIconsComponent} from './modules/shared/nav-icons/nav-icons.component';
import {LoginRegisterComponent} from './modules/login-register/login-register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MyProfileComponent} from './modules/my-profile/my-profile.component';
import {SimpleHeaderComponent} from './modules/shared/simple-header/simple-header.component';
import {SideMenuComponent} from './modules/my-profile/side-menu/side-menu.component';
import {MyProfileDataComponent} from './modules/my-profile/data/data.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NavIconsComponent,
    LoginRegisterComponent,
    MyProfileComponent,
    SimpleHeaderComponent,
    SideMenuComponent,
    MyProfileDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
