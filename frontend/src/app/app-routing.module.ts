import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAnnonceurComponent } from './board-annonceur/board-annonceur.component';
import { RegisterAnnonceurComponent } from "./register-annonceur/register-annonceur.component";
import { VideoIndexComponent } from './video-index/video-index.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'register-annonceur', component: RegisterAnnonceurComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'annonceur', component: BoardAnnonceurComponent },
  { path: 'video-index', component: VideoIndexComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
