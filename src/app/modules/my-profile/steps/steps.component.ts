import {Component, Inject, OnInit} from '@angular/core';
import {IUser} from '../../../interfaces/user.interface';
import {ProfileService} from '../../../services/profile.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {FileService} from '../../../services/file.service';
import {ISteps} from '../../../interfaces/steps.interface';
import {IStep} from '../../../interfaces/step.interface';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {StepsService} from '../../../services/steps.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-my-profile-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss']
})
export class MyProfileStepsComponent implements OnInit {

  profileDetails: IUser;
  creatorSteps: ISteps;
  newStep: IStep;
  newAdditionsForm: FormGroup;
  isAddingStep = false;
  isVideoIdValid = false;
  player: YT.Player;

  constructor(
    private profileService: ProfileService,
    private stepsService: StepsService,
    private fileService: FileService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
  ) {
    this.newAdditionsForm = this.formBuilder.group({
      pictureUrl: [''],
      videoId: [''],
      text: [''],
    });
    this.newStep = {
      price: null,
      description: '',
      patronsNum: 0,
      additions: {
        videoId: '',
        pictureUrl: '',
        text: ''
      }
    };
  }

  showAddStepForm() {
    this.isAddingStep = !this.isAddingStep;
    if (this.isAddingStep) {
      this.newStep = {
        price: null,
        description: '',
        patronsNum: 0,
        additions: {
          videoId: '',
          pictureUrl: '',
          text: ''
        }
      };
    }
    this.isVideoIdValid = false;
  }

  sortedSteps() {
    if (this.creatorSteps.steps === undefined) {
      return null;
    }
    return this.creatorSteps.steps.sort((a, b) => a.price - b.price);
  }

  addStep() {
    console.log(this.creatorSteps);
    this.creatorSteps.steps.push(this.newStep);
    this.showAddStepForm();
    this.stepsService.tryUpdateSteps(this.creatorSteps)
      .then( response => {
        // console.log(response);
        // this.stepsService.getProfileSteps(this.creatorSteps.creatorUid);
      }, error => {
        console.log(error);
      });
  }

  // YT input handling
  removeNewStepVideo() {
    this.newStep.additions.videoId = '';
    this.isVideoIdValid = false;
  }

  openYoutubeDialog(): void {
    const dialogRef = this.dialog.open(YoutubeDialog, {
      height: '200px',
      width: '300px',
    });
    this.isVideoIdValid = false;
    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      // console.log(result);
      if (result !== '') {
        const resultStr = result.toString();
        let videoId = '';
        if (resultStr.search('youtu.be') === -1) {
          videoId = resultStr.split('v=')[1];
          const ampersandPosition = videoId.indexOf('&');
          if (ampersandPosition !== -1) {
            videoId = videoId.substring(0, ampersandPosition);
          }
        } else {
          videoId = resultStr.split('/').pop();
        }
        // console.log(videoId);
        this.newStep.additions.videoId = videoId;
        this.isVideoIdValid = true;
      }
    });
  }

  // YT player methods
  savePlayer(player) {
    this.player = player;
    // console.log('player instance', player);
  }

  onPlayerStateChange(event) {
    // console.log('player state', event.data);
  }

  // picture handling
  sendPicture(event) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.newAdditionsForm.get('pictureUrl').setValue(file);
      const formData = new FormData();
      formData.append('file', this.newAdditionsForm.get('pictureUrl').value);
      // console.log(formData);
      this.fileService.uploadPicture(formData)
        .then( response => {
          const jsonResponse = JSON.parse(JSON.stringify(response));
          this.newStep.additions.pictureUrl = jsonResponse.fileUrl;
          // console.log(this.newStep.additions.pictureUrl);
        }, error => {
          console.log(error);
        });
    }
  }

  removeNewStepPicture() {
    this.newStep.additions.pictureUrl = '';
  }

  ngOnInit() {
    this.profileService.details().subscribe( details => {
      this.profileDetails = details;
      if (details != null) {
        if (this.profileDetails.role === 'supporter') {
          this.router.navigate(['moj_profil', 'czszegoly_tworcy']);
        }
        this.stepsService.getProfileSteps(details.uid);
      }
    });
    this.profileService.steps().subscribe( steps => {
      this.creatorSteps = steps;
    });
  }
}


export interface DialogData {
  youtubeLink: string;
}

@Component({
  selector: 'app-youtube-dialog',
  template: `
    <div mat-dialog-content>
      <p>Podaj link do filmu YT</p>
      <mat-form-field>
        <input matInput [(ngModel)]="data.youtubeLink">
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Anuluj</button>
      <button mat-button [mat-dialog-close]="data.youtubeLink">Zatwierdź</button>
    </div>
  `,
})

// tslint:disable-next-line:component-class-suffix
export class YoutubeDialog {

  constructor(
    public dialogRef: MatDialogRef<YoutubeDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.data = {
      youtubeLink: ''
    };
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
