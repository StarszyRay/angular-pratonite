import {Component, OnInit} from '@angular/core';
import {ProfileService} from '../../../services/profile.service';
import {IUser} from '../../../interfaces/user.interface';

@Component({
  selector: 'app-my-profile-creator-details',
  templateUrl: './creator-details.component.html',
  styleUrls: ['creator-details.component.scss']
})
export class MyProfileCreatorDetailsComponent implements OnInit {
  isFloatLabel = true;
  creatorDetails: IUser;
  newTag = '';

  constructor(
    private profileService: ProfileService
  ) {

  }

  becomeCreator() {
    this.profileService.makeUserACreator()
      .then( success => {
      }, error => {
        console.log(error);
      });
  }

  removeTag(tag: string) {
    const index = this.creatorDetails.creatorFields.tags.indexOf(tag, 0);
    if (index > -1) {
      this.creatorDetails.creatorFields.tags.splice(index, 1);
      // console.log(this.creatorDetails.creatorFields.tags);
    }
  }

  addTag() {
    if (!!this.newTag) {
      this.creatorDetails.creatorFields.tags.push(this.newTag);
      this.newTag = '';
    }
  }

  saveCreatorDetails() {
    this.profileService.tryUpdateProfile(this.creatorDetails)
      .then( res => {
      }, err => {
        console.log(err);
    });
  }

  ngOnInit() {
    this.profileService.details().subscribe(
      details => {
        this.creatorDetails = details;
      }, error => {
        console.log(error);
        this.creatorDetails = null;
      });
  }
}
