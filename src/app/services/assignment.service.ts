import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Assignment } from '../models/assignmet';
import { Observable } from 'rxjs';
import { Matiere } from '../models/matiere';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  uri = 'https://mbds-assignment-ws-valisoa-narda.onrender.com/api';
  constructor(private http:HttpClient) { }

  getAll() {
    const Mypseudo = localStorage.getItem('pseudo');
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const body = { pseudo: Mypseudo }; 
    return this.http.post<any>(this.uri + '/etu/assignment/all', body, { headers: headers });
  }
  getNonrendu() {
    const Mypseudo = localStorage.getItem('pseudo');
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const body = { pseudo: Mypseudo }; 
    return this.http.post<Assignment[]>(this.uri + '/etu/assignemnt/nonrendu', body, { headers: headers });
  }
  getUrgent() {
    const Mypseudo = localStorage.getItem('pseudo');
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const body = { pseudo: Mypseudo }; 
    return this.http.post<Assignment[]>(this.uri + '/etu/assignment/alert/deadline', body, { headers: headers });
  }
  getOne(id:string): Observable<Assignment>{
    const Mypseudo = localStorage.getItem('pseudo');
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const body = { pseudo: Mypseudo, assiId : id };
    return this.http.post<any>(this.uri + '/etu/assignment/id', body, { headers: headers });
  }
  rendre(id:number): Observable<Assignment>{
    const Mypseudo = localStorage.getItem('ID');
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const body = { studentId: Mypseudo, assignmentId : id };
    return this.http.post<any>(this.uri + '/etu/assignment/rendre', body, { headers: headers });
  }
  getAllMatiere(){
    return this.http.get<{ message: string, data: Matiere[] }>(this.uri + '/matiere/liste')
    .pipe(map(response => response.data));
  }
}
