import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { UserProfileComponent } from './auth/user-profile/user-profile.component';
import { SignupComponent } from './auth/signup/signup.component';
import { DetailComponent } from './components/detail/detail.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';

import { GuardAuthGuard } from './auth/guard-auth.guard';
import { HomeComponent } from './components/home/home.component';
import { BoardComponent } from './components/board/board.component';
import { BoardDetailComponent } from './components/board-detail/board-detail.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  
  {
    path: 'boards',
    component: BoardComponent,
    canActivate: [GuardAuthGuard],
  },
  { path: 'boards/:id', component: BoardDetailComponent },
 
  { path: 'detail/:id', component: DetailComponent },

  { path: 'login', component: LoginComponent },
  {
    path: 'userprofile',
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
