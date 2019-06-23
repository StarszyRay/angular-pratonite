import {Component, OnInit} from '@angular/core';
import {IUser} from '../../../interfaces/user';
import {ProfileService} from '../../../services/profile.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ZoomFadeAnimation} from '../../../animations/zoom-fade.animation';

@Component({
  selector: 'app-my-profile-data',
  templateUrl: './data.component.html',
  styleUrls: ['data.component.scss'],
  animations: ZoomFadeAnimation.animations
})
export class MyProfileDataComponent implements OnInit {

  isFloatLabel = 'always';
  profileDetails: IUser;
  name = '';
  avatarAnimationState = 'inactive';
  isUpdatedSuccessfully: boolean = null;
  avatarForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private profileService: ProfileService) {
    this.avatarForm = this.formBuilder.group({
      avatar: ['']
    });
  }

  saveProfile() {
    console.log(this.profileDetails);
    this.profileService.tryUpdateProfile(this.profileDetails)
      .then(result => {
        console.log(result);
        this.isUpdatedSuccessfully = true;
      }, err => {
        console.log(err);
        this.isUpdatedSuccessfully = false;
      });
  }

  avatarChangeEvent(event) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.avatarForm.get('avatar').setValue(file);
      const formData = new FormData();
      formData.append('file', this.avatarForm.get('avatar').value);
      console.log(formData);
      this.profileService.uploadAvatar(formData, this.profileDetails.uid)
        .then( response => {
          console.log(response);
        }, error => {
          console.log(error);
      });
    }
  }

  avatarHoverEnter() {
    this.avatarAnimationState = 'active';
  }

  avatarHoverLeave() {
    this.avatarAnimationState = 'inactive';
  }


  ngOnInit() {
    this.profileService.details().subscribe( details => {
      this.profileDetails = details;
    });
  }
}
