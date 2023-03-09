import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, AfterViewInit {
  loginForm: FormGroup;
  @ViewChild('email') nameElementRef: ElementRef;
  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    console.log(this.loginForm);
  }
  ngAfterViewInit() {
    this.nameElementRef.nativeElement.focus();
  }
  login() {
    this.authService.login(this.loginForm.value).subscribe((item: any) => {
      
      localStorage.setItem('token', item.token);
      localStorage.setItem('email', item.email);
      this.loginForm.reset();
      this.router.navigate(['boards']);
    });
  }
}
