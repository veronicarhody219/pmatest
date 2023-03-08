import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, tap } from 'rxjs';
import { ProjectService } from './project.service';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  urlBoard = 'http://localhost:8000/boards';
  constructor(
    private http: HttpClient,
    private projectService: ProjectService
  ) {}
  public _refreshrequired = new Subject<void>();
  get RequiredRefresh() {
    return this._refreshrequired;
  }
  createBoard(board) {
    return this.http.post(this.urlBoard, board).pipe(
      tap(() => {
        this.RequiredRefresh.next();
      })
    );
  }
  getBoards() {
    return this.http.get(this.urlBoard);
  }
  getBoard(id: string) {
    return this.http.get(`${this.urlBoard}/${id}`);
  }
  updateBoard(id: string, board) {
    return this.http.put(`${this.urlBoard}/${id}`, board).pipe(
      tap(() => {
        this.RequiredRefresh.next();
      })
    );
  }
  deleteBoard(id: string) {
    return this.http.delete(`${this.urlBoard}/${id}`).pipe(
      tap(() => {
        this.RequiredRefresh.next();
      })
    );
  }
}
