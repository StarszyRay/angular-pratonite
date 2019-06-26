import {HttpClient} from '@angular/common/http';
import {Inject} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {IUser} from '../interfaces/user.interface';
import {AngularFireAuth} from '@angular/fire/auth';
import {ISteps} from '../interfaces/steps.interface';
import {ISubscription} from '../interfaces/subscription.interface';

export class ProfileService {

  private usersUrl = 'http://localhost:3000/users';
  private stepsUrl = 'http://localhost:3000/steps';
  private subscriptionsUrl = 'http://localhost:3000/subscriptions';
  private profileDetails = new BehaviorSubject<IUser>(null);
  private profileSubscriptions = new BehaviorSubject<ISubscription[]>(null);
  private profileSteps = new BehaviorSubject<ISteps>(null);
  public profileUid = new BehaviorSubject<string>('');
  private defaultAvatarUrl = 'http://localhost:3000/file/avatars/default.png';

  constructor(
    @Inject(HttpClient) private httpClient: HttpClient,
    @Inject(AngularFireAuth) private angularFireAuth: AngularFireAuth
  ) {
    this.angularFireAuth.user.subscribe(
      user => {
        if (user) {
          this.profileUid.next(user.uid);
          this.getProfileDetails();
          this.getProfilesSubscriptions();
          this.getProfileSteps();
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
    user.subscribe(
      (u) => {
        this.profileDetails.next(u as IUser);
      }
    );
  }

  getProfilesSubscriptions() {
    // console.log(`${this.subscriptionsUrl}/${this.profileUid.value}`)
    this.httpClient.get(`${this.subscriptionsUrl}/${this.profileUid.value}`)
      .subscribe(subscriptions => {
        this.profileSubscriptions.next(subscriptions as ISubscription[]);
      });
  }

  getProfileSteps() {
    this.httpClient.get(`${this.stepsUrl}/${this.profileUid.value}`)
      .subscribe(steps => {
        this.profileSteps.next(steps as ISteps);
      });
  }

  details(): Observable<IUser> {
    return this.profileDetails.asObservable();
  }

  subscriptions(): Observable<ISubscription[]> {
    return this.profileSubscriptions.asObservable();
  }

  steps(): Observable<ISteps> {
    return this.profileSteps.asObservable();
  }

  addNewProfile(userUid: string, userData) {
    const user: IUser = {
      uid: userUid,
      email: userData.email,
      visibleName: `${userData.name} ${userData.surname}`,
      avatar: this.defaultAvatarUrl,
      name: userData.name,
      surname: userData.surname,
      role: 'supporter',
      creatorFields: {
        tags: [],
        specialization: '',
        description: '',
      },
    };
    console.log(user);
    this.httpClient.post(this.usersUrl, user).subscribe(
      res => {
        this.profileDetails.next(res as IUser);
      }
    );
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
    return this.httpClient.post(this.usersUrl, data).toPromise();
  }

  updateUserSubscription(subscription: ISubscription) {
    this.httpClient.post(this.subscriptionsUrl, subscription).subscribe(
      res => {
        this.getProfilesSubscriptions();
      }, err => {
        console.log(err);
    }
    );
  }

  makeUserACreator(): Promise<any> {
    this.profileDetails.value.role = 'creator';
    const newSteps: ISteps = {
      creatorUid: this.profileUid.value
    };
    this.httpClient.post(this.stepsUrl, newSteps).subscribe( res => {
      this.profileSteps.next(res as ISteps);
    });
    return this.httpClient.post(this.usersUrl, this.profileDetails.value).toPromise();
  }
}
