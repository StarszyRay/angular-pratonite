import {HttpClient} from '@angular/common/http';
import {Inject} from '@angular/core';


export class CreatorService {

  private usersUrl = 'http://localhost:3000/users';

  constructor(
    @Inject(HttpClient) private httpClient: HttpClient
  ) {
  }


  getCreator(uid: string): Promise<any> {
    return this.httpClient.get(`${this.usersUrl}/byUid?uid=${uid}`).toPromise();
  }

  recommendedCreators(): Promise<any> {
    return this.httpClient.get(`${this.usersUrl}/creators`).toPromise();
  }

}
