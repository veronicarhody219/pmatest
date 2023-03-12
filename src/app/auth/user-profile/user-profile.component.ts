import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  email;
  uName = 'not specified';
  constructor() {}

  ngOnInit(): void {
    this.getEmail();
  }
  getEmail() {
    this.email = localStorage.getItem('email');
  }
  
}
