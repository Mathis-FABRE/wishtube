import {Component, Input, OnInit} from '@angular/core';
import {PlaylistService} from "../_services/playlist.service";

@Component({
  selector: 'app-playlist-button',
  templateUrl: './playlist-button.component.html',
  styleUrls: ['./playlist-button.component.scss']
})
export class PlaylistButtonComponent implements OnInit{
  @Input() video: any;
  isInPlaylist: boolean = false;

  constructor(private playlistService: PlaylistService) {
  }

  addToMaPlaylist() {
    this.playlistService.addVideoToMaPlaylist(this.video).subscribe(data => {
      if(data)
        this.isInPlaylist = true;
    });
  }

  deleteFromMaPlaylist() {
    this.playlistService.deleteVideoFromMaPlaylist(this.video.Url).subscribe(data => {
      if(data)
        this.isInPlaylist = false
    })
  }

  ngOnInit() {
    this.playlistService.videoInUser(this.video.Url).subscribe( data => {
      this.isInPlaylist = data.message;
    })
  }
}
