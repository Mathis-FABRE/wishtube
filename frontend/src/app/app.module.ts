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

import { BoardAnnonceurPopUpCreateAnnonceComponent } from './board-annonceur-pop-up-create-annonce/board-annonceur-pop-up-create-annonce.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BoardAnnonceurPopUpUpdateAnnonceComponent } from './board-annonceur-pop-up-update-annonce/board-annonceur-pop-up-update-annonce.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PubComponent } from './pub/pub.component';
import { PlaylistButtonComponent } from './playlist-button/playlist-button.component';
import { VideoPlaylistComponent } from './video-playlist/video-playlist.component';
import { PlaylistComponent } from './playlist/playlist.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAnnonceurComponent,
    RegisterAnnonceurComponent,
    BoardAnnonceurPopUpCreateAnnonceComponent,
    BoardAnnonceurPopUpUpdateAnnonceComponent,
    VideoIndexComponent,
    VideoComponent,
    SearchBarComponent,
    PubComponent,
    PlaylistButtonComponent,
    VideoPlaylistComponent,
    PlaylistComponent
  ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
      MatDialogModule,
      MatFormFieldModule,
      BrowserAnimationsModule,
      NgbModule
    ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
