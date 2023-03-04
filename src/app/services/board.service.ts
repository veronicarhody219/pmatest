import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  urlBoard = 'http://localhost:8000/projects';
  constructor(private http: HttpClient) {}
  createBoard(board) {
    return this.http.post(this.urlBoard, board);
  }
  getBoards() {
    return this.http.get(this.urlBoard);
  }
  getBoard(id: string) {
    return this.http.get(`${this.urlBoard}/${id}`);
  }
  updateBoard(id: string, board) {
    return this.http.put(`${this.urlBoard}/${id}`, board);
  }
  deleteBoard(id: string) {
    return this.http.delete(`${this.urlBoard}/${id}`);
  }
}
