import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { API_LINK } from '../_helpers/globals';

const PLAYLIST = API_LINK + 'playlist/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  constructor(private http: HttpClient) { }

  videoInUser(url: string): Observable<any> {
    return this.http.post(PLAYLIST + "exist", {
      url
    }, httpOptions);
  }

  addVideoToMaPlaylist(videoJson: any): Observable<any> {
    let formData: FormData = new FormData();
    formData.append('url', videoJson.Url);
    formData.append('thumbnail', videoJson.Thumbnail);
    formData.append('name', videoJson.Title);
    formData.append('author', videoJson.Author);
    console.log(videoJson);
    return this.http.post(PLAYLIST + "addVideoToMaPlaylist", formData);
  }
}
