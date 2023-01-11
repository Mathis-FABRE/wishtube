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
      console.log(data);
      this.isInPlaylist = true;
    });

  }

  ngOnInit() {
    this.playlistService.videoInUser(this.video.Url).subscribe( data => {
      this.isInPlaylist = data.message;
    })
  }
}
