import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { AnnoncesService } from '../_services/annonces.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { BoardAnnonceurPopUpCreateAnnonceComponent } from '../board-annonceur-pop-up-create-annonce/board-annonceur-pop-up-create-annonce.component';

@Component({
  selector: 'app-board-annonceur',
  templateUrl: './board-annonceur.component.html',
  styleUrls: ['./board-annonceur.component.scss']
})
export class BoardAnnonceurComponent {
  content?: string;
  annonces : any = [];

  constructor(private userService: UserService,
              private annoncesService: AnnoncesService,
              private matdialog: MatDialog) { }

  ngOnInit(): void {
    this.userService.getAnnonceurBoard().subscribe({
      next: data => {

        this.annoncesService.getAnnoncesAuthor().subscribe({
          next: data => {
            this.annonces = JSON.parse(data).message;
          },
          error: err => {
            this.content = JSON.parse(err.error).message;
          }
        });
      },
      error: err => {
        this.content = JSON.parse(err.error).message;
      }
    });
  }

  OpenCreatePopup() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    const popup= this.matdialog.open(BoardAnnonceurPopUpCreateAnnonceComponent,dialogConfig);
    popup.afterClosed().subscribe(item=>{
      console.log(item);
    });
  }
}
