import { Component, OnInit, ViewChild } from '@angular/core';

import { Project } from 'src/app/interface/project';
import { ProjectService } from 'src/app/services/project.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

import { AddProjectComponent } from '../add-project/add-project.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  edit: boolean = false;
  errorMessage: string;
  currentId;

  constructor(
    private projectService: ProjectService,

    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getProjects();
    this.projectService.RequiredRefresh.subscribe((result) => {
      this.getProjects();
    });
  }
  getProjects() {
    this.projectService.GetAllProjects().subscribe(
      (projects) => {
        
        this.projects = projects;
      }
    );
  }
  deleteProject(id: string) {
    console.log(id);
    let askBeforeDeleting = confirm('Do you want to delete this project?');
    if (askBeforeDeleting) {
      this.projectService.DeleteProject(id).subscribe((result) => {
        this.getProjects();
      });
    }
  }
  deleteTask(id, i, tasks) {
    if (confirm('Are you sure to delete this task?')) {
      tasks.splice(i, 1);
    }
    let currentProject = this.projects.find((p) => p._id === id);
    
    this.projectService.UpdateProject(currentProject).subscribe();
  }
  editTask(id) {}

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

      // currentProject = this.projects.find((p) => p._id === id);
      // this.projectService.UpdateProject(currentProject).subscribe();
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      // currentProject = this.projects.find((p) => p._id === id);
      // this.projectService.UpdateProject(currentProject).subscribe();
    }
  }
  dropInside(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.projects, event.previousIndex, event.currentIndex);
    
  }

  openDialog(id: string): void {
    const dialogRef = this.dialog.open(AddProjectComponent, {
      data: { id },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
  editProject(id: string) {
    this.openDialog(id);
  }
}
