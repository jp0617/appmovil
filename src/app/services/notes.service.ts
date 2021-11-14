import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  private url = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  getnotes = (id) =>
    this.http.get<any>(`${this.url}`, {
      params: { id },
    });
  getonenote = (id) => this.http.get<any>(`${this.url}/${id}`);
  auth = (userform) => this.http.post<any>(`${this.url}/auth`, userform);
  createnote = (datanote) => this.http.post<any>(`${this.url}`, datanote);
  updatenote = (noteform) => this.http.put<any>(`${this.url}`, noteform);
  deletenote = (noteid) => this.http.delete(`${this.url}`, {
    params: {noteid}
  });
}
