import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl} from "@angular/forms";
import {AuthService} from "../_services/auth.service";
import {VideoService} from "../_services/video.service";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit{
  search: FormControl
  @Output() videoResearch: EventEmitter<any> = new EventEmitter<any>();
  youtubeList: Array<any> = [];
  dailymotionList: Array<any> = [];

  constructor(private videoService: VideoService) {
    this.search = new FormControl<string>('');
  }

  ngOnInit() {
  }

  researchYoutube() {
    return this.videoService.searchYoutube(this.search.value, 100).subscribe({
        next: data => {
          this.youtubeList = data.Video;
          console.log({youtube:this.youtubeList, dailymotion:this.dailymotionList})
          this.videoResearch.emit({"youtube":this.youtubeList, "dailymotion":this.dailymotionList});
        },
        error: err => {
          console.log(err);
        }
      }
    );
  }

  researchDailymotion() {
    return this.videoService.searchDailymotion(this.search.value, 100).subscribe({
        next: data => {
          this.dailymotionList = data.Video;
          console.log({youtube:this.youtubeList, dailymotion:this.dailymotionList})
          this.videoResearch.emit({"youtube":this.youtubeList, "dailymotion":this.dailymotionList});
        },
        error: err => {
          console.log(err);
        }
      }
    );
  }

  research() {
    this.researchYoutube();
    this.researchDailymotion();
  }
}
