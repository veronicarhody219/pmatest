import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { UserProfileComponent } from './auth/user-profile/user-profile.component';
import { SignupComponent } from './auth/signup/signup.component';
import { DetailComponent } from './components/detail/detail.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { ProjectComponent } from './components/project/project.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { GuardAuthGuard } from './auth/guard-auth.guard';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'projects',
    component: ProjectsComponent,
    canActivate: [GuardAuthGuard],
  },
  { path: 'detail/:id', component: DetailComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'userprofile/:id',
    component: UserProfileComponent,
    canActivate: [GuardAuthGuard],
  },
  { path: 'signup', component: SignupComponent },

  { path: '**', component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
