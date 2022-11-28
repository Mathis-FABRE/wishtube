import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-board-annonceur',
  templateUrl: './board-annonceur.component.html',
  styleUrls: ['./board-annonceur.component.scss']
})
export class BoardAnnonceurComponent {
  content?: string;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAnnonceurBoard().subscribe({
      next: data => {
        this.content = data;
      },
      error: err => {
        this.content = JSON.parse(err.error).message;
      }
    });
  }
}
