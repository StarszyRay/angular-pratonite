import {trigger, state, style, transition, animate, AnimationTriggerMetadata} from '@angular/animations';

export class ZoomFadeAnimation {
  static animations = ZoomFadeAnimation.getAnimations();

  static getAnimations(): Array<AnimationTriggerMetadata> {
    return [
      trigger('zoomFade', [
        state(
          'active',
          style({
            transform: 'scale(1.1)',
            opacity: 0.8
          })
        ),
        state(
          'inactive',
          style({
            transform: 'scale(1)',
            opacity: 0
          })
        ),
        transition('active => inactive', animate('400ms ease-out')),
        transition('inactive => active', animate('400ms ease-in')),
      ]),
      trigger('zoomFadeBlur', [
        state(
          'active',
          style({
            transform: 'scale(1.1)',
          })
        ),
        state(
          'inactive',
          style({
            transform: 'scale(1)',
          })
        ),
        transition('active => inactive', animate('400ms ease-out')),
        transition('inactive => active', animate('400ms ease-in')),
      ]),
    ];
  }
}
