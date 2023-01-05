import { Component } from '@angular/core';
import {AuthService} from "../_services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register-annonceur',
  templateUrl: './register-annonceur.component.html',
  styleUrls: ['./register-annonceur.component.scss']
})
export class RegisterAnnonceurComponent {
  form: any = {
    username: null,
    email: null,
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { username, email, password } = this.form;

    this.authService.register(username, email, password, ["user", "annonceur"]).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.router.navigateByUrl('/login');
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }
}
