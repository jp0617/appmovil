import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  private url: string = environment.urlapi;
  constructor(private http: HttpClient) {}

  getnotes = () => this.http.get<any>(`${this.url}`);
}
