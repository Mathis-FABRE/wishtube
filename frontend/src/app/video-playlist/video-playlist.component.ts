import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-video-playlist',
  templateUrl: './video-playlist.component.html',
  styleUrls: ['./video-playlist.component.scss']
})
export class VideoPlaylistComponent implements OnInit {
  @Input() video: any;

  @Output() videoEmitter: EventEmitter<any> = new EventEmitter<any>();

  trustedUrl: SafeUrl = "";

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.video.url);
  }

  sendVideo() {
    this.videoEmitter.emit({"title": this.video.name, "url": this.trustedUrl});
  }
}
