import {Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';

export class SubscriptionsService {

  constructor(@Inject(HttpClient) private httpClient: HttpClient
  ) {
  }

}
