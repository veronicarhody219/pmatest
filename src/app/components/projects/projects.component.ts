import { Component, OnInit, ViewChild } from '@angular/core';

import { Project } from 'src/app/interface/project';
import { ProjectService } from 'src/app/services/project.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  edit: boolean = false;
  @ViewChild('projectForm') form: NgForm;

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProjects();
  }
  getProjects() {
    this.projectService.GetAllProjects().subscribe((projects) => {
      console.log(projects);
      this.projects = projects;
    });
  }
  deleteProject(id: string) {
    console.log(id);
    let askBeforeDeleting = confirm('Do you want to delete this project?');
    if (askBeforeDeleting) {
      this.projectService.DeleteProject(id).subscribe();
    }
  }
  editProject(id: string) {
    let currentProject = this.projects.find((p) => p._id === id);

    this.projectService.UpdateProject(currentProject).subscribe();
    this.form.setValue({
      group: currentProject.group,
      name: currentProject.name,
      desc: currentProject.desc,
      tasks: currentProject.tasks,
    });
  }

  save(id: string) {
    let currentProject = this.projects.find((p) => p._id === id);
    this.projectService.UpdateProject(currentProject).subscribe();
  }
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
  dropInside(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.projects, event.previousIndex, event.currentIndex);
  }
}
