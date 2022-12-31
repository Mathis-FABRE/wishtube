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
  videosAll: Array<any> = [];

  active: number = 1;
  constructor() {
  }

  displayVideos(data: any){
    this.displayYoutube(data);
    this.displayDailymotion(data);

    let youtube = [...this.videosYoutube];
    let dailymotion = [...this.videosDailymotion];
    this.videosAll = this.mergeTwoRandom(youtube, dailymotion);
  }

  displayYoutube(data: any) {
    console.log('displaying Youtube');
    this.videosYoutube = data.youtube;
  }

  displayDailymotion(data: any) {
    console.log('displaying Dailymotion');
    this.videosDailymotion = data.dailymotion;
  }

  extractRandom(arr: Array<any>) {
    let index = Math.floor(Math.random() * arr.length);
    let result = arr[index];
    // remove item from the array
    arr.splice(index, 1);
    return(result);
  }

  mergeTwoRandom(arr1: Array<any>, arr2: Array<any>) {
    var result = [];
    while (arr1.length || arr2.length) {
      if (arr1.length) {
        result.push(this.extractRandom(arr1));
      }
      if (arr2.length){
        result.push(this.extractRandom(arr2));
      }
    }
    return(result);
  }
}
