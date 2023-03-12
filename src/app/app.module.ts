import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './material.module';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { AddProjectComponent } from './components/add-project/add-project.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  HttpClientModule,
  HTTP_INTERCEPTORS,
  HttpClient,
} from '@angular/common/http';
import { ProjectService } from './services/project.service';
import { DetailComponent } from './components/detail/detail.component';
import { LoginComponent } from './auth/login/login.component';

import { UserProfileComponent } from './auth/user-profile/user-profile.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthInterceptor } from './services/authconfig.interceptor';
import { HomeComponent } from './components/home/home.component';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BoardComponent } from './components/board/board.component';
import { BoardDetailComponent } from './components/board-detail/board-detail.component';
import { AddBoardComponent } from './components/add-board/add-board.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,

    PagenotfoundComponent,
    FooterComponent,
    HeaderComponent,
    AddProjectComponent,
    DetailComponent,
    LoginComponent,
    UserProfileComponent,
    SignupComponent,
    HomeComponent,
    BoardComponent,
    BoardDetailComponent,
    AddBoardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    ProjectService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
