import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const VIDEO_LISTING = 'http://localhost:1337/api/video/list/';

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
