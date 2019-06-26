import {IStep} from './step.interface';

export interface ISteps {
  _id?: string;
  creatorUid: string;
  steps?: [IStep];
}
