import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-my-profile-data',
  templateUrl: './data.component.html',
  styleUrls: ['data.component.scss']
})
export class MyProfileDataComponent implements OnInit {

  imie: string;
  constructor() {
    this.imie = 'JakiesImie';
  }

  ngOnInit() {
  }
}
