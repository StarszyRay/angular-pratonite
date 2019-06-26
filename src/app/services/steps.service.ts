import {ISteps} from '../interfaces/steps.interface';
import {Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';

export class StepsService {

  private stepsUrl = 'http://localhost:3000/steps';

  constructor(
    @Inject(HttpClient) private httpClient: HttpClient
  ) {
  }

  tryUpdateSteps(steps: ISteps): Promise<any> {
    return this.httpClient.post(this.stepsUrl, steps).toPromise();
  }

  getProfileSteps(id: string): Promise<any> {
    if (id === null) {
      return;
    }
    // console.log(id);
    return this.httpClient.get(`${this.stepsUrl}/${id}`).toPromise();
  }
}
