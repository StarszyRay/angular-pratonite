import {HttpClient} from '@angular/common/http';
import {Inject} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {IUser} from '../interfaces/user';
import {AngularFireAuth} from '@angular/fire/auth';
import deleteProperty = Reflect.deleteProperty;

export class ProfileService {

  private usersUrl = 'http://localhost:3000/users';
  private profileDetails = new BehaviorSubject<IUser>(null);
  public profileUid = new BehaviorSubject<string>(null);

  constructor(
    @Inject(HttpClient) private httpClient: HttpClient,
    @Inject(AngularFireAuth) private angularFireAuth: AngularFireAuth
  ) {
    this.angularFireAuth.user.subscribe(
      user => {
        if (user) {
          this.profileUid.next(user.uid);
          this.getProfileDetails();
        }
      }, () => {    // error handling
        this.profileUid.next(null);
        this.profileDetails.next(null);
      }, () => {  // completion handling
        this.profileUid.next(null);
        this.profileDetails.next(null);
      }
    );
  }

  getProfileDetails() {
    const user = this.httpClient.get(`${this.usersUrl}/byUid?uid=${this.profileUid.value}`);
    console.log(`${this.usersUrl}/byUid?uid=${this.profileUid.value}`);
    user.subscribe(
      (u) => {
        this.profileDetails.next(u as IUser);
      }
    );
  }

  details(): Observable<IUser> {
    return this.profileDetails.asObservable();
  }

  addNewProfile(userUid: string, userData) {
    const user = {
      uid: userUid,
      email: userData.email,
      visibleName: `${userData.name} ${userData.surname}`,
      avatar: '',
      name: userData.name,
      surname: userData.surname,
      role: 'supporter'
    };
    this.httpClient.post(this.usersUrl, user);
  }

  addNewGoogleProfile(googleUser) {
    const userName = googleUser.displayName.split(' ');
    let tempSurname = '';
    if (userName.length > 1) {
      tempSurname = userName[1];
    }
    const user = {
      uid: googleUser.uid,
      email: googleUser.email,
      visibleName: googleUser.displayName,
      avatar: googleUser.photoURL,
      name: userName[0],
      surname: tempSurname,
      role: 'supporter'
    };
    this.httpClient.post(this.usersUrl, user).subscribe( e => {});
  }

  tryUpdateProfile(data: IUser): Promise<any> {
    console.log(`${this.usersUrl}?id=${data._id}`);
    return this.httpClient.put(`${this.usersUrl}?id=${data._id}`, data).toPromise();
  }

  uploadAvatar(avatar, uid) {
    return this.httpClient.post(`${this.usersUrl}/changeAvatar?uid=${uid}`, avatar).toPromise();
  }

}
