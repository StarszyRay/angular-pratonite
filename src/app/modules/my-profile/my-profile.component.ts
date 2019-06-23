import {Component, OnInit} from '@angular/core';
import {ProfileService} from '../../services/profile.service';
import {IUser} from '../../interfaces/user';

@Component({
  selector: 'app-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  profileDetails: IUser;

  constructor(private profileService: ProfileService) {
  }

  ngOnInit() {
    this.profileService.details().subscribe( details => {
      this.profileDetails = details;
    });
  }
}
