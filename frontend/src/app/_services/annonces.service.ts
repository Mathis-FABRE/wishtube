import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:1337/api/annonce/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AnnoncesService {

  constructor(private http: HttpClient) { }

  getAnnoncesAuthor(): Observable<any> {
    return this.http.get(API_URL, { responseType: 'text' });
  }

  createAnnonce(name: string, file: string, coutParClic: number): Observable<any> {
    return this.http.post(API_URL + 'create', {
      name,
      file,
      coutParClic
    }, httpOptions);
  }
}
