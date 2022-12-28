import { Component } from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-video-index',
  templateUrl: './video-index.component.html',
  styleUrls: ['./video-index.component.scss'],
  providers: [NgbNavModule]
})
export class VideoIndexComponent {
  videosYoutube: Array<any> = [];
  videosDailymotion: Array<any> = [];

  active: number = 1;
  constructor() {
  }

  displayYoutube(data: any) {
    console.log('displaying Youtube');
    this.videosYoutube = data.Video;
  }

  displayDailymotion(data: any) {
    console.log('displaying Youtube');
    this.videosDailymotion = data.Video;
  }
}
