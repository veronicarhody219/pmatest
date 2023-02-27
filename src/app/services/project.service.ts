import { Injectable } from '@angular/core';
import { Project } from '../interface/project';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  url: string = 'http://localhost:8000/projects';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  projects: Project[] = [];
  constructor(private http: HttpClient) {}

  AddProject(data: Project) {
    return this.http.post(this.url, data);
  }
  GetAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.url);
  }
  GetProject(id: string): Observable<Project> {
    return this.http.get<Project>(`${this.url}/${id}`);
  }
  DeleteProject(id: string): Observable<Project> {
    return this.http.delete<Project>(`${this.url}/${id}`);
  }
  DeleteAllProjects(): Observable<Project[]> {
    return this.http.delete<Project[]>(this.url);
  }
  UpdateProject(project: Project): Observable<any> {
    return this.http.put<Project>(
      `${this.url}/${project._id}`,
      project,
      this.httpOptions
    );
  }
}
