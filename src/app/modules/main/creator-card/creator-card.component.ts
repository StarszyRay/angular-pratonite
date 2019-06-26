import {Component, HostListener, Input, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {IUser} from '../../../interfaces/user.interface';


@Component({
  selector: 'app-creator-card',
  templateUrl: './creator-card.component.html',
  styleUrls: ['./creator-card.component.scss'],
  animations: [
    trigger('fadeIn', [
      state('inactive', style({
        opacity: 0
      })),
      state('active', style({
        opacity: 1
      })),
      transition('inactive <=> active', [
          animate('0.2s')
      ])
    ]),
    trigger('infoSlide', [
      state('active', style({
        height: '75%'
      })),
      transition( '* <=> *', [
          animate( '0.2s' )
      ] )
    ])
  ]
})
export class CreatorCardComponent implements OnInit {

  animationState = 'inactive';
  @Input() creator: IUser;

  constructor() {

  }

  @HostListener('mouseenter')
  noMouseEnter() {
    this.animationState = 'active';
    // console.log('entered ', this.animationState);
  }
  @HostListener('mouseleave')
  noMouseLeave() {
    this.animationState = 'inactive';
    // console.log('left', this.animationState);
  }

  ngOnInit() {
  }
}
