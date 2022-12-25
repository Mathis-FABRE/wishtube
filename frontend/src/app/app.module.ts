import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAnnonceurComponent } from './board-annonceur/board-annonceur.component';

import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { RegisterAnnonceurComponent } from './register-annonceur/register-annonceur.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { VideoComponent } from './video/video.component';
import { VideoIndexComponent } from './video-index/video-index.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAnnonceurComponent,
    RegisterAnnonceurComponent,
    SearchBarComponent,
    VideoComponent,
    VideoIndexComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
