import { Component } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private roles: string[] = [];
  isLoggedIn = false;
  showAnnonceurBoard = false;
  username?: string;

  constructor(private tokenStorageService: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (!!this.tokenStorageService.getToken()) {
        const user = this.tokenStorageService.getUser();
        this.roles = user.roles;

        this.showAnnonceurBoard = this.roles.includes('ROLE_ANNONCEUR');

        this.username = user.username;
      }

      // if (event.constructor.name === "NavigationEnd") {
      this.isLoggedIn = !!this.tokenStorageService.getToken();
      // }
    })

  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
