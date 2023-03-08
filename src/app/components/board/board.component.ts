import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BoardService } from 'src/app/services/board.service';
import { ProjectService } from 'src/app/services/project.service';
import { AddBoardComponent } from '../add-board/add-board.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  boards = [];
 
  constructor(private boardService: BoardService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getBoards();
    this.boardService.RequiredRefresh.subscribe((result) => {
      this.getBoards();
    });
  }
  createBoard(id) {
    let dialogRef = this.dialog.open(AddBoardComponent, { data: { id } });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('dialog:', result);
    });
  }
  getBoards() {
    this.boardService.getBoards().subscribe((boards: any) => {
      this.boards = boards;
      console.log(this.boards);
    });
  }
  updateBoard(id) {
    this.createBoard(id);
  }
  deleteBoard(id) {
    if (
      confirm('Do you want to delete this board including all its content?')
    ) {
      this.boardService.deleteBoard(id).subscribe((result) => {
        console.log('board deleted');
      });
    }
  }
}
