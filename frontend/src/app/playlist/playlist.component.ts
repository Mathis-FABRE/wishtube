import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PlaylistService} from "../_services/playlist.service";

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
  @Output() videoEmitter: EventEmitter<any> = new EventEmitter<any>();

  videos: Array<any> = [];

  constructor(private playlistService: PlaylistService) {
  }

  ngOnInit() {
    this.playlistService.getMaPlaylist().subscribe({
      next: data => {
        this.videos = data;
      }
    })
  }

  sendVideo(data: any) {
    console.log({data})
    this.videoEmitter.emit({"title": data.title, "url": data.url});
  }
}
