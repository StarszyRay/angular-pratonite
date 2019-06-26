import {Component, OnInit} from '@angular/core';
import {ProfileService} from '../../services/profile.service';
import {FileService} from '../../services/file.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ISteps} from '../../interfaces/steps.interface';
import {IUser} from '../../interfaces/user.interface';
import {CreatorService} from '../../services/creator.service';
import {StepsService} from '../../services/steps.service';
import {ISubscription} from '../../interfaces/subscription.interface';
import {SubscriptionsService} from '../../services/subscriptions.service';

@Component({
  selector: 'app-creator',
  templateUrl: './creator.component.html',
  styleUrls: ['./creator.component.scss']
})
export class CreatorComponent implements OnInit {

  creatorSteps: ISteps;
  creatorDetails: IUser;
  visitorSubscription: ISubscription;
  creatorUid: string;
  player: YT.Player;
  patronsNum = 0;
  monthlyIncome = 0;

  constructor(
    private profileService: ProfileService,
    private fileService: FileService,
    private route: ActivatedRoute,
    private creatorService: CreatorService,
    private stepsService: StepsService,
    private subscriptionService: SubscriptionsService,
    private router: Router
  ) {
  }

  // YT player methods
  savePlayer(player) {
    this.player = player;
    // console.log('player instance', player);
  }

  onPlayerStateChange(event) {
    // console.log('player state', event.data);
  }

  sortedSteps() {
    if (this.creatorSteps === null) {
      return null;
    }
    return this.creatorSteps.steps.sort((a, b) => a.price - b.price);
  }

  calculateStats() {
    if (this.creatorSteps != null) {
      for (const step of this.creatorSteps.steps) {
        this.patronsNum += step.patronsNum;
        this.monthlyIncome += step.patronsNum * step.price;
      }
    }
  }

  setSubscription(price: number) {
    if (this.visitorSubscription.patronUid === '') {
      this.router.navigate(['login']);
    }
    this.visitorSubscription.step = price;
    this.profileService.updateUserSubscription(this.visitorSubscription);
  }

  setLowerSubscription(newPrice: number) {
    let stepLower = 0;
    this.creatorSteps.steps.forEach( step => {
      if (step.price < newPrice && stepLower < step.price) {
        stepLower = step.price;
      }
    });
    this.visitorSubscription.step = stepLower;
    this.profileService.updateUserSubscription(this.visitorSubscription);
  }

  ngOnInit() {
    this.creatorUid = this.route.snapshot.params.uid;
    this.profileService.subscriptions().subscribe( subs => {
        this.visitorSubscription = {
          creatorUid: this.creatorUid,
          patronUid: this.profileService.profileUid.value,
          step: 0
        };
        if (subs != null) {
          subs.forEach(sub => {
            if (sub.creatorUid === this.creatorUid) {
              this.visitorSubscription = sub;
            }
          });
        }
        console.log(this.visitorSubscription);
    });
    this.stepsService.getProfileSteps(this.creatorUid)
      .then( steps => {
      this.creatorSteps = steps;
      this.calculateStats();
    });
    this.creatorService.getCreator(this.creatorUid)
      .then( creator => {
        this.creatorDetails = creator;
        // console.log(this.creatorDetails);
      });
  }
}
