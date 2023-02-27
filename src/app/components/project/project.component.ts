import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Project } from 'src/app/interface/project';
import { ProjectService } from 'src/app/services/project.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  projects: Project[] = [];
  set: string[] = [];
  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.getProjects();
  }
  getProjects() {
    this.projectService.GetAllProjects().subscribe((projects) => {
      let groups = [];
      console.log(projects);
      this.projects = projects;
      this.projects.map((item) => {
        groups.push(item.group);
      });
      this.set = [...new Set(groups)];
    });
  }

  deleteProject(id: string) {
    let askBeforeDeleting = confirm('Do you want to delete this project?');
    if (askBeforeDeleting) {
      this.projectService.DeleteProject(id).subscribe();
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.projects, event.previousIndex, event.currentIndex);
  }
}
