import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { BoardService } from 'src/app/services/board.service';

@Component({
  selector: 'app-add-board',
  templateUrl: './add-board.component.html',
  styleUrls: ['./add-board.component.scss'],
})
export class AddBoardComponent implements OnInit {
  isEditBoard: boolean = false;
  currentId: string;
  editData: any;

  constructor(
    private formBuilder: FormBuilder,
    private boardService: BoardService,
    public dialogRef: MatDialogRef<AddBoardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    if (this.data.id != null && this.data.id != '') {
      this.editBoard(this.data.id);
    }
  }
  boardForm = this.formBuilder.group({
    title: ['', Validators.required],
  });
  createBoard() {
    if (!this.editData && this.boardForm.valid) {
      this.boardService
        .createBoard(this.boardForm.value)
        .subscribe((result) => {
         
          this.dialogRef.close();
        });
    }
    if (this.editData && this.boardForm.valid) {
      this.boardService
        .updateBoard(this.currentId, this.boardForm.value)
        .subscribe((result) => {
          
          this.dialogRef.close();
        });
    }
  }
  editBoard(id) {
    this.currentId = id;
    this.boardService.getBoard(id).subscribe((item) => {
      this.isEditBoard = true;
      this.editData = item;
      this.boardForm.setValue({
        title: this.editData.title,
      });
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
