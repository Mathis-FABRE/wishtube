import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {API_LINK} from "../_helpers/globals";

const VIDEO_LISTING = API_LINK + 'api/video/list/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(private http: HttpClient) { }

  searchYoutube(term: string, maxRes: number): Observable<any> {
    return this.http.post(VIDEO_LISTING + 'youtube', {
      term,
      maxRes
    }, httpOptions);
  }

  searchDailymotion(term: string, maxRes: number): Observable<any> {
    return this.http.post(VIDEO_LISTING + 'dailymotion', {
      term,
      maxRes
    }, httpOptions);
  }
}
