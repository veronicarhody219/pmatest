import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Project } from 'src/app/interface/project';
import { ProjectService } from 'src/app/services/project.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  project: Project | undefined;
  newTasks: string;
  editMode: boolean = false;
  currentId: number;
  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getProject();
  }
  getProject() {
    const id = this.route.snapshot.paramMap.get('id');
    this.projectService.GetProject(id).subscribe((project) => {
      this.project = project;
    });
  }

  addTask() {
    if (!this.editMode) {
      this.project.tasks.push(this.newTasks);
    } else {
      this.project.tasks[this.currentId] = (<HTMLInputElement>(
        document.getElementById('project-tasks')
      )).value;
    }
    this.newTasks = '';
  }
  editTask(i) {
    this.editMode = true;
    (<HTMLInputElement>document.getElementById('project-tasks')).value =
      this.project.tasks[i];
    this.currentId = i;
  }
  deleteTask(i) {
    if (confirm('Are you sure to delete this task?')) {
      this.project.tasks.splice(i, 1);
    }
  }

  goBack() {
    this.location.back();
  }
  save() {
    this.projectService
      .UpdateProject(this.project)
      .subscribe(() => this.goBack());
  }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.project.tasks,
      event.previousIndex,
      event.currentIndex
    );
  }
}
