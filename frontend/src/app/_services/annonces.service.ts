import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
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

  createAnnonce(name: string, file: File, coutParClic: number): Observable<any> {

    let formData: FormData = new FormData();

    formData.append('name', name);
    formData.append('file', file);
    formData.append('coutParClic', coutParClic.toString());

    return this.http.post(API_URL + 'create',formData);
  }

  changeStatusAnnonce(idAnnonce: number): Observable<any> {
    let formData: FormData = new FormData();
    formData.append('idAnnonce', idAnnonce.toString());

    return this.http.patch(API_URL + 'changeActivationStatus',formData);
  }

  deleteAnnonce(idAnnonce: number, filepath: string): Observable<any> {
    return this.http.delete(API_URL + 'delete', {
      body: {
        idAnnonce: idAnnonce,
        filepath: filepath
      }
    });
  }
}
