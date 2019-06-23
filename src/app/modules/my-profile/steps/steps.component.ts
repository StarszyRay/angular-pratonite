import {Component, OnInit} from '@angular/core';
import {IUser} from '../../../interfaces/user';
import {ProfileService} from '../../../services/profile.service';


@Component({
  selector: 'app-my-profile-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss']
})
export class MyProfileStepsComponent implements OnInit {

  profileDetails: IUser;
  constructor(private profileService: ProfileService) {
  }

  ngOnInit() {
    this.profileService.details().subscribe( details => {
      this.profileDetails = details;
    });
  }
}
