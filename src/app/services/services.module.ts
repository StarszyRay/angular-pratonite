import {NgModule} from '@angular/core';
import {AuthService} from './auth.service';
import {ProfileService} from './profile.service';
import {FileService} from './file.service';

@NgModule({
  providers: [
    AuthService,
    ProfileService,
    FileService
  ]
})
export class ServicesModule {}
