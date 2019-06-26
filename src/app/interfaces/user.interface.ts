import {ICreator} from './creator.interface';

export interface IUser {
  _id?: string;
  uid: string;
  email: string;
  name: string;
  surname: string;
  avatar: string;
  visibleName: string;
  role: string;
  creatorFields: ICreator;
}
