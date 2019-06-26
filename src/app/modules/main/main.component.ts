import {Component, OnInit, ViewChild} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {CarouselComponent} from 'angular-bootstrap-md';
import {CreatorService} from '../../services/creator.service';
import {IUser} from '../../interfaces/user.interface';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition('* <=> *', [
        style( {opacity: 0}),
        animate('500ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1})
        )
      ])
    ])
  ]
})
export class MainComponent implements OnInit {
  public currentIndex: number;
  public recommendedCreators: IUser[];
  slides = [
    {image: '../../../assets/slides-assets/img00.jpg', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'},
    {image: '../../../assets/slides-assets/img01.jpg', description: 'Fusce mattis dolor ut elit ultrices'},
    {image: '../../../assets/slides-assets/img02.jpg', description: 'et eleifend dolor placerat.'},
    {image: '../../../assets/slides-assets/img03.jpg', description: 'Lorem ipsum dolor sit amet,'},
    {image: '../../../assets/slides-assets/img04.jpg', description: 'consectetur adipiscing elit. Aenean'},
  ];
  @ViewChild('carousel') carousel: CarouselComponent;

  constructor(private creatorService: CreatorService) {
    this.currentIndex = 0;
  }

  onActiveSlideChange(event) {
    this.currentIndex = event.relatedTarget;
  }

  ngOnInit() {
    this.carousel.play();
    this.creatorService.recommendedCreators()
      .then( recommended =>  {
        this.recommendedCreators = recommended;
      });
  }

}
