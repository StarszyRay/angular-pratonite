import {Component, OnInit, ViewChild} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {CarouselComponent} from 'angular-bootstrap-md';

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
  slides = [
    {image: '../../../assets/slides-assets/img00.jpg', description: 'Image 00'},
    {image: '../../../assets/slides-assets/img01.jpg', description: 'Image 01'},
    {image: '../../../assets/slides-assets/img02.jpg', description: 'Image 02'},
    {image: '../../../assets/slides-assets/img03.jpg', description: 'Image 03'},
    {image: '../../../assets/slides-assets/img04.jpg', description: 'Image 04'},
  ];
  @ViewChild('carousel') carousel: CarouselComponent;

  constructor() {
    this.currentIndex = 0;
  }

  onActiveSlideChange(event) {
    this.currentIndex = event.relatedTarget;
  }

  ngOnInit() {
    this.carousel.play();
  }

}
