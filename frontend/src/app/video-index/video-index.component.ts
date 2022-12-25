import { Component } from '@angular/core';

@Component({
  selector: 'app-video-index',
  templateUrl: './video-index.component.html',
  styleUrls: ['./video-index.component.scss']
})
export class VideoIndexComponent {
  videos: string = "";
  constructor() {
  }

  display(data: any) {
    console.log('displaying');
    this.videos = JSON.stringify(data);
  }
}
