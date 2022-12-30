import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:1337/api/annonce/';
const API_IMAGE_URL = 'http://localhost:1337/api/images/';

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

  getImageAnnonce(filename: string):Observable<Blob> {
    return this.http.get(API_IMAGE_URL + filename, { responseType: 'blob' });
 }

  createAnnonce(name: string, file: File, coutParClic: number): Observable<any> {
    let formData: FormData = new FormData();

    formData.append('name', name);
    formData.append('file', file);
    formData.append('coutParClic', coutParClic.toString());

    return this.http.post(API_URL + 'create',formData);
  }

  changeStatusAnnonce(idAnnonce: number): Observable<any> {
    let body = { idAnnonce: idAnnonce };

    return this.http.patch(API_URL + 'changeActivationStatus',body);
  }

  deleteAnnonce(idAnnonce: number, filepath: string): Observable<any> {
    return this.http.delete(API_URL + 'delete', {
      body: {
        idAnnonce: idAnnonce,
        filepath: filepath
      }
    });
  }

  updateAnnonce(idAnnonce: number, name: string, file: File, coutParClic: number): Observable<any> {
    let formData: FormData = new FormData();
    formData.append('idAnnonce', idAnnonce.toString());
    formData.append('name', name);
    formData.append('file', file);
    formData.append('coutParClic', coutParClic.toString());

    return this.http.post(API_URL + 'update', formData);
  }
}
