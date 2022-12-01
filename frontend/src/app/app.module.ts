import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
import { BoardAnnonceurPopUpCreateAnnonceComponent } from './board-annonceur-pop-up-create-annonce/board-annonceur-pop-up-create-annonce.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAnnonceurComponent,
    RegisterAnnonceurComponent,
    BoardAnnonceurPopUpCreateAnnonceComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        MatDialogModule,
        MatFormFieldModule,
        BrowserAnimationsModule
    ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
