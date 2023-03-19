import { Component, OnInit } from '@angular/core';

import { Project } from 'src/app/interface/project';
import { ProjectService } from 'src/app/services/project.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { FormArray, FormBuilder, Validators } from '@angular/forms';

import { AddProjectComponent } from '../add-project/add-project.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-board-detail',
  templateUrl: './board-detail.component.html',
  styleUrls: ['./board-detail.component.scss'],
})
export class BoardDetailComponent implements OnInit {
  projects: Project[] = [];
  edit: boolean = false;
  errorMessage: string;
  currentId;

  constructor(
    private projectService: ProjectService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {}
  taskForm = this.formBuilder.group({
    tasks: this.formBuilder.array([this.formBuilder.control('')]),
  });

  get tasks() {
    return this.taskForm.get('tasks') as FormArray;
  }
  // addTask() {
  //   this.tasks.push(this.formBuilder.control(''));
  // }
  saveTask(id) {
    let currentProject = this.projects.find((p) => p._id === id);
    const tasks = this.taskForm.value.tasks;

    currentProject.tasks = currentProject.tasks.concat(tasks);

    this.projectService.UpdateProject(currentProject).subscribe();
    this.taskForm.reset();
  }
  ngOnInit(): void {
    this.getProjects();
    this.projectService.RequiredRefresh.subscribe((result) => {
      this.getProjects();
    });
  }
  getProjects() {
    this.projectService.GetAllProjects().subscribe((projects) => {
      this.projects = projects;
    });
  }
  deleteProject(id: string) {
    let askBeforeDeleting = confirm('Do you want to delete this project?');
    if (askBeforeDeleting) {
      this.projectService.DeleteProject(id).subscribe((result) => {
        this.getProjects();
      });
    }
  }
  deleteTask(id, i) {
    let currentProject = this.projects.find((p) => p._id === id);
    if (confirm('Are you sure to delete this task?')) {
      currentProject.tasks.splice(i, 1);
    }
    this.projectService.UpdateProject(currentProject).subscribe();
  }

  editTask(id) {
    console.log(`editing task ${id}`);
  }

  save(id: string) {
    let currentProject = this.projects.find((p) => p._id === id);
    this.currentId = id;
    this.projectService.UpdateProject(currentProject).subscribe();
  }
  drop(id, event: CdkDragDrop<string[]>) {
    let currentProject;
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      currentProject = this.projects.find((p) => p._id === id);
      this.projectService.UpdateProject(currentProject).subscribe();
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      // currentProject = this.projects.find((p) => p._id === id);
      //this.projectService.UpdateProject(currentProject).subscribe();
    }
  }
  dropInside(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.projects, event.previousIndex, event.currentIndex);
  }

  openDialog(id: string): void {
    const dialogRef = this.dialog.open(AddProjectComponent, {
      data: { id },
    });
    dialogRef.afterClosed().subscribe();
  }
  editProject(id: string) {
    this.openDialog(id);
  }
}
