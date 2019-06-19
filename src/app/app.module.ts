// modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule, WavesModule } from 'angular-bootstrap-md';

// components
import { AppComponent } from './app.component';
import {MainComponent} from './modules/main/main.component';
import {NavIconsComponent} from './modules/shared/nav-icons/nav-icons.component';
import {LoginRegisterComponent} from './modules/login-register/login-register.component';
import {MyProfileComponent} from './modules/my-profile/my-profile.component';
import {SimpleHeaderComponent} from './modules/shared/simple-header/simple-header.component';
import {SideMenuComponent} from './modules/my-profile/side-menu/side-menu.component';
import {MyProfileDataComponent} from './modules/my-profile/data/data.component';
import {MyProfileStepsComponent} from './modules/my-profile/steps/steps.component';
import { FooterComponent } from './modules/shared/footer/footer.component';
import {CreatorComponent} from './modules/creator/creator.component';
import {CreatorCardComponent} from './modules/main/creator-card/creator-card.component';
import { TestsComponent } from './modules/tests/tests.component';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NavIconsComponent,
    LoginRegisterComponent,
    MyProfileComponent,
    SimpleHeaderComponent,
    SideMenuComponent,
    MyProfileDataComponent,
    MyProfileStepsComponent,
    FooterComponent,
    CreatorComponent,
    CreatorCardComponent,
    TestsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    CarouselModule.forRoot(),
    WavesModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
