import { Component, OnInit, Inject } from '@angular/core';

import {
  FormControl,
  FormGroup,
  Validators,
  FormArray,
  FormBuilder,
} from '@angular/forms';
import { ProjectService } from 'src/app/services/project.service';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss'],
})
export class AddProjectComponent implements OnInit {
  editData: any;
  editMode: boolean = false;
  currentId: string;
  errorMessage: string = null;

  constructor(
    private projectService: ProjectService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  // reactiveForm = new FormGroup({
  //   group: new FormControl('', Validators.required),
  //   pname: new FormControl('', Validators.required),
  //   desc: new FormControl('', [Validators.required, Validators.minLength(6)]),
  //   tasks: new FormArray([
  //     new FormControl('task 1'),
  //     new FormControl('task 2'),
  //     new FormControl('task 3'),
  //   ]),
  // });
  reactiveForm = this.formBuilder.group({
    group: ['', Validators.required],
    pname: ['', Validators.required],
    desc: ['', [Validators.required, Validators.minLength(6)]],
    tasks: this.formBuilder.array([this.formBuilder.control('')]),
  });

  onNoClick(): void {
    this.dialogRef.close();
  }
  saveProject() {
    try {
      if (this.reactiveForm.valid && !this.editMode) {
        this.projectService
          .saveProject(this.reactiveForm.value)
          .subscribe((result) => {
            
            this.dialogRef.close();
          });
      } else if (this.reactiveForm.valid && this.editMode) {
        this.projectService
          .editProject(this.currentId, this.reactiveForm.value)
          .subscribe((result) => {
            
            this.dialogRef.close();
          });
      }
    } catch (error) {
      this.errorMessage = error.message;
    }
  }

  loadEditData(id: string) {
    this.currentId = id;
    this.projectService.GetProject(id).subscribe(
      (item) => {
        this.editMode = true;
        this.editData = item;

        this.reactiveForm.setValue({
          group: this.editData.group,
          pname: this.editData.pname,
          desc: this.editData.desc,
          tasks: this.editData.tasks,
        });
      },
      (error) => {
        this.errorMessage = error.message;
      }
    );
  }

  ngOnInit(): void {
    if (this.data.id != null && this.data.id != '') {
      this.loadEditData(this.data.id);
    }
  }
get tasks(){
return this.reactiveForm.get('tasks') as FormArray;
}
  addTask() {
    
    this.tasks.push(this.formBuilder.control(''));
  }
}
