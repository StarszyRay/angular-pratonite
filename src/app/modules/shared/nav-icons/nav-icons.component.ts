import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ProfileService} from '../../../services/profile.service';
import {IUser} from '../../../interfaces/user';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav-icons',
  templateUrl: './nav-icons.component.html',
  styleUrls: ['./nav-icons.component.scss']
})
export class NavIconsComponent implements OnInit {

  profile: IUser;
  displayProfileIcons = false;

  constructor(private profileService: ProfileService,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.authService.isLoggedIn().subscribe( authenticated => {
      this.displayProfileIcons = authenticated;
    });
  }

  logout() {
    this.authService.logout()
      .then( () => {
        this.router.navigate(['/login']);
      });
  }

}
