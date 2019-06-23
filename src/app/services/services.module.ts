import {NgModule} from '@angular/core';
import {AuthService} from './auth.service';
import {ProfileService} from './profile.service';

@NgModule({
  providers: [
    AuthService,
    ProfileService
  ]
})
export class ServicesModule {}
