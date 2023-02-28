import { Router } from '@angular/router';
import {
  Component,
  OnInit,
  ViewChild,
  NgZone,
  OnChanges,
  SimpleChanges,
  Inject,
} from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/interface/project';
import { HttpClient } from '@angular/common/http';

import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss'],
})
export class AddProjectComponent implements OnInit {
  editData: any;
  editMode: boolean = false;
  currentId: string;

  constructor(
    private projectService: ProjectService,
    public dialogRef: MatDialogRef<AddProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ngZone: NgZone
  ) {}

  reactiveForm = new FormGroup({
    group: new FormControl('', Validators.required),
    pname: new FormControl('', Validators.required),
    desc: new FormControl('', [Validators.required, Validators.minLength(6)]),
    tasks: new FormControl([], [Validators.required, Validators.minLength(6)]),
  });
  onNoClick(): void {
    this.dialogRef.close();
  }
  saveProject() {
    if (this.reactiveForm.valid && !this.editMode) {
      this.projectService
        .saveProject(this.reactiveForm.value)
        .subscribe((result) => {
          console.log(result);
          this.dialogRef.close();
        });
    } else {
      this.projectService
        .editProject(this.currentId, this.reactiveForm.value)
        .subscribe((result) => {
          console.log(result);
          this.dialogRef.close();
        });
    }
  }

  loadEditData(id: string) {
    this.currentId = id;
    this.projectService.GetProject(id).subscribe((item) => {
      this.editMode = true;
      this.editData = item;

      this.reactiveForm.setValue({
        group: this.editData.group,
        pname: this.editData.pname,
        desc: this.editData.desc,
        tasks: this.editData.tasks,
      });
    });
  }

  ngOnInit(): void {
    if (this.data.id != null && this.data.id != '') {
      this.loadEditData(this.data.id);
    }
  }
}
