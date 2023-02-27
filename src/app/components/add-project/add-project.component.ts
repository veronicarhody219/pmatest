import { Router } from '@angular/router';
import {
  Component,
  OnInit,
  ViewChild,
  NgZone,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

import { FormControl, Validators, NgForm } from '@angular/forms';
import { ProjectService } from 'src/app/services/project.service';
import { Project} from 'src/app/interface/project';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss'],
})
export class AddProjectComponent implements OnInit {
  group: string = '';
  name: string = '';
  desc: string = '';
  tasks: string[]=[]
  @ViewChild('myForm') form: NgForm;
  constructor(private projectService: ProjectService) {}
  ngOnInit() {}

  submitForm() {
    let newProject = {
      group: this.group,
      name: this.name,
      desc: this.desc,
      tasks: this.tasks,
    };

    this.projectService.AddProject(newProject).subscribe((res) => {
      this.projectService.projects.push(newProject);
      console.log(this.projectService.projects);
      console.log(res);
    });
    this.form.reset();
  }
}
