import {NgModule} from '@angular/core';
import {AuthService} from './auth.service';
import {ProfileService} from './profile.service';
import {FileService} from './file.service';
import {CreatorService} from './creator.service';
import {StepsService} from './steps.service';
import {SubscriptionsService} from './subscriptions.service';

@NgModule({
  providers: [
    AuthService,
    ProfileService,
    FileService,
    CreatorService,
    StepsService,
    SubscriptionsService
  ]
})
export class ServicesModule {}
