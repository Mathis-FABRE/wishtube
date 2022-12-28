import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl} from "@angular/forms";
import {AuthService} from "../_services/auth.service";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit{
  search: FormControl
  @Output() videosYoutubeEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output() videosDailymotionEmitter: EventEmitter<any> = new EventEmitter<any>();

  constructor(private authService: AuthService) {
    this.search = new FormControl<string>('');
  }

  ngOnInit() {
  }

  research() {
    this.authService.searchYoutube(this.search.value, 50).subscribe({
        next: data => {
          console.log(data);
          this.videosYoutubeEmitter.emit(data);
        },
        error: err => {
          console.log(err);
        }
      }
    );
    this.authService.searchDailymotion(this.search.value, 50).subscribe({
        next: data => {
          console.log(data);
          this.videosDailymotionEmitter.emit(data);
        },
        error: err => {
          console.log(err);
        }
      }
    );
  }
}
